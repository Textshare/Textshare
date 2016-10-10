defmodule Textshare.TagSuggestionsController do
  use Textshare.Web, :controller
  alias Textshare.Document

  plug Guardian.Plug.EnsureAuthenticated, handler: Textshare.SessionController

  def index(conn, _params) do

  end
end
