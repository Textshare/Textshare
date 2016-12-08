defmodule Textshare.DocumentController do
  use Textshare.Web, :controller
  alias Textshare.{Document, Revision}

  plug Guardian.Plug.EnsureAuthenticated, handler: Textshare.SessionController

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    current_user =
      current_user
      |> Repo.preload([{:own_documents, [:tags, :owner, :revision]}, {:shared_documents, [:tags, :owner, :revision]}])

    conn
    |> put_status(:ok)
    |> render("index.json", documents: current_user.own_documents ++ current_user.shared_documents)
  end

  def show(conn, %{"id" => document_id}) do
    current_user = Guardian.Plug.current_resource(conn)

    document = Repo.get!(Document, document_id) |> Repo.preload([:tags, :owner, :collaborators, :revision])

    if Enum.member?([document.owner | document.collaborators], current_user) do
      conn
      |> put_status(:ok)
      |> render("show.json", document: document )
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  def create(conn, %{"document" => document_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    document_changeset = current_user
      |> Ecto.build_assoc(:own_documents)
      |> Document.changeset(document_params)

    case Repo.insert(document_changeset) do
      {:ok, document} ->
        revision_changeset = document
          |> Ecto.build_assoc(:revisions)
          |> Revision.changeset(
              %{content: document_params["content"], row_ids: document_params["row_ids"]}
            )

        case Repo.insert(revision_changeset) do
          {:ok, revision} ->
            changeset = Document.changeset(document, %{revision_id: revision.id})

            case Repo.update(changeset) do
              {:ok, document} ->
                document = Repo.preload(document, [:revision, :tags, :owner])
                conn
                |> put_status(:created)
                |> render("show.json", document: document )

              {:error, changeset} ->
                conn
                |> put_status(:unprocessable_entity)
                |> render("error.json", changeset: changeset)
            end

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render("error.json", changeset: changeset)
        end

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id} = params) do
    current_user = Guardian.Plug.current_resource(conn)
    document = Repo.get!(Document, id) |> Repo.preload([:collaborators])

    if Enum.member?([document.owner | document.collaborators], current_user) do
      document_changeset = Document.changeset(document, params)

      case Repo.update(document_changeset) do
        {:ok, document} ->
          revision = Repo.get!(Revision, document.revision_id)
          revision_changeset = Revision.changeset(
            revision, %{content: params["content"], row_ids: params["row_ids"]}
          )

          case Repo.update(revision_changeset) do
            {:ok, _revision} ->
              document = Repo.preload(document, [:revision, :tags, :owner])
              conn
              |> put_status(:ok)
              |> render("show.json", document: document )

            {:error, changeset} ->
              conn
              |> put_status(:unprocessable_entity)
              |> render("error.json", changeset: changeset)
          end

        {:error, changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", changeset: changeset)
      end
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  def delete(conn, %{"id" => document_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    document = Repo.get!(Document, document_id) |> Repo.preload([:tags, :owner])

    if current_user.id == document.user_id do
      case Repo.delete(document) do
        {:ok, document} ->
          conn
          |> put_status(:ok)
          |> render("delete.json", document: document )
        {:error, changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", changeset: changeset)
      end
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end
end
