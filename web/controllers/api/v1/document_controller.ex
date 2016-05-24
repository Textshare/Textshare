defmodule Textshare.DocumentController do
  use Textshare.Web, :controller

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
end
