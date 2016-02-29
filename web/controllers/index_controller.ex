defmodule Textshare.IndexController do
  use Textshare.Web, :controller

  def index(conn, _params) do
    render conn, "app.html"
  end
end
