defmodule Textshare.RevisionController do
  use Textshare.Web, :controller
  alias Textshare.{Document, Revision}

  plug Guardian.Plug.EnsureAuthenticated, handler: Textshare.SessionController

  def index(conn, %{"document_id" => document_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    document = Repo.get!(Document, document_id) |> Repo.preload([:revisions])

    if current_user.id == document.user_id do
      conn
      |> put_status(:ok)
      |> render("index.json", revisions: order_revisions_for_document(document) )
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  def create(conn, %{"document_id" => document_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    document = Repo.get!(Document, document_id) |> Repo.preload([:revision])

    if current_user.id == document.user_id do
      revision_changeset = document
        |> Ecto.build_assoc(:revisions)
        |> Revision.changeset(
            %{content: document.revision.content, row_ids: document.revision.row_ids}
          )

      case Repo.insert(revision_changeset) do
        {:ok, revision} ->
          conn
          |> put_status(:created)
          |> render("show.json", revision: revision )
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

  defp order_revisions_for_document(document) do
    document.revisions |> Enum.sort(fn(r1, r2) ->
      cond do
        r1.id == document.revision_id -> true
        r2.id == document.revision_id -> false
        true ->
          case Ecto.DateTime.compare(r1.inserted_at, r2.inserted_at) do
            :lt -> false
            _ -> true
          end
      end
    end)
  end
end
