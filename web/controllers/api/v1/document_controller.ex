defmodule Textshare.DocumentController do
  use Textshare.Web, :controller
  alias Textshare.Document

  plug Guardian.Plug.EnsureAuthenticated, handler: Textshare.SessionController

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    documents = current_user
      |> Ecto.assoc(:documents)
      |> Repo.all

    conn
    |> put_status(:ok)
    |> render("index.json", documents: documents)
  end

  def create(conn, %{"document" => document_params}) do
    current_user = Guardian.Plug.current_resource(conn)
    changeset = current_user
      |> Ecto.build_assoc(:documents)
      |> Document.changeset(document_params)

    case Repo.insert(changeset) do
      {:ok, document} ->
        conn
        |> put_status(:created)
        |> render("show.json", document: document )
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
