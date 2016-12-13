defmodule Textshare.CollaboratorController do
  use Textshare.Web, :controller
  alias Textshare.{Document, User, Sharing}

  plug Guardian.Plug.EnsureAuthenticated, handler: Textshare.SessionController

  def index(conn, %{"document_id" => document_id}) do
    current_user = current_user(conn)
    document = document(document_id)

    if has_access?(current_user, document) do
      conn
      |> put_status(:ok)
      |> render("index.json", collaborators: document.collaborators )
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  def set(conn, %{"document_id" => document_id, "collaborators_ids" => collaborators_ids}) do
    current_user = current_user(conn)
    document = document(document_id)

    collaborators_ids = String.split(collaborators_ids, ",") |> Enum.filter(fn x -> x != "" end)

    if has_access?(current_user, document) do
      q = from s in Sharing, where: s.document_id == ^document_id

      Repo.delete_all(q)

      for collaborator_id <- collaborators_ids do
        Sharing.changeset(%Sharing{}, %{"document_id" => document_id, "user_id" => collaborator_id})
        |> Repo.insert!
      end

      document = document(document_id)

      conn
      |> put_status(:ok)
      |> render("set.json", collaborators: document.collaborators,
                possible_collaborators: possible_collaborators(document))
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  def possible(conn, %{"document_id" => document_id}) do
    current_user = current_user(conn)
    document = document(document_id)

    if has_access?(current_user, document) do
      conn
      |> put_status(:ok)
      |> render("index.json", collaborators: possible_collaborators(document))
    else
      conn
      |> put_status(:forbidden)
      |> render(Textshare.SessionView, "forbidden.json", error: "Not Authenticated")
    end
  end

  defp document(document_id) do
    Repo.get!(Document, document_id) |> Repo.preload([:tags, :owner, :collaborators])
  end

  defp current_user(conn) do
    Guardian.Plug.current_resource(conn)
  end

  defp has_access?(user, document) do
    Enum.member?([document.owner | document.collaborators], user)
  end

  defp possible_collaborators(document) do
    collaborators_ids = Enum.map([document.owner | document.collaborators], &(&1.id))

    q = from u in User, where: not(u.id in ^collaborators_ids), select: u

    Repo.all(q)
  end
end
