defmodule Textshare.TagController do
  use Textshare.Web, :controller
  alias Textshare.{Document, DocumentTag, Tag}

  plug Guardian.Plug.EnsureAuthenticated, handler: Textshare.SessionController

  def index(conn, %{"document_id" => document_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    document = Repo.get!(Document, document_id) |> Repo.preload(:tags)

    if current_user.id == document.user_id do
      conn
      |> put_status(:ok)
      |> render("index.json", tags: document.tags )
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  def create(conn, %{"document_id" => document_id, "tag" => %{"name" => tag_name}}) do
    current_user = Guardian.Plug.current_resource(conn)
    document = Repo.get!(Document, document_id)

    if current_user.id == document.user_id do
      q = from t in Tag, where: t.name == ^tag_name, select: t

      if tag = Repo.one(q) do
        changeset = DocumentTag.changeset(
          %DocumentTag{}, %{"document_id" => document_id, "tag_id" => tag.id}
        )
        case Repo.insert(changeset) do
          {:ok, _document_tag} ->
            conn
            |> put_status(:created)
            |> render("show.json", tag: tag)
          {:error, _changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render("error.json")
        end
      else
        # TODO: handle failure
        # Repo.transaction fn ->
          tag = Tag.changeset(%Tag{}, %{"name" => tag_name})
                |> Repo.insert!
          DocumentTag.changeset(
            %DocumentTag{}, %{"document_id" => document_id, "tag_id" => tag.id}
          ) |> Repo.insert!

        # end

        conn
          |> put_status(:created)
          |> render("show.json", tag: tag)
      end
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  def delete(conn, %{"document_id" => document_id, "tag_id" => tag_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    document = Repo.get!(Document, document_id)

    if current_user.id == document.user_id do
      q = from dt in DocumentTag,
          where: dt.document_id == ^document_id and dt.tag_id == ^tag_id,
          select: dt
      document_tag = Repo.one(q)
      case Repo.delete(document_tag) do
        {:ok, _document_tag} ->
          conn
          |> put_status(:created)
          |> render("delete.json")
        {:error, _changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json")
      end
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end
end
