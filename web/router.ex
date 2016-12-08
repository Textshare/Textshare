defmodule Textshare.Router do
  use Textshare.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Textshare do
    pipe_through :api

    scope "/v1" do
      post "/registrations", RegistrationController, :create
      post "/sessions", SessionController, :create
      delete "/sessions", SessionController, :delete
      get "/current_user", CurrentUserController, :show

      resources "/documents", DocumentController, only: [:show, :update, :index, :create, :delete]
      resources "/tag_suggestions", TagSuggestionsController, only: [:index]

      get "/documents/:document_id/tags", TagController, :index
      post "/documents/:document_id/tags", TagController, :create
      delete "/documents/:document_id/tags/:tag_id", TagController, :delete

      get "/documents/:document_id/revisions", RevisionController, :index
      post "/documents/:document_id/revisions", RevisionController, :create
      get "/documents/:document_id/collaborators", CollaboratorController, :index
      get "/documents/:document_id/possible_collaborators", CollaboratorController, :possible
      post "/documents/:document_id/set_collaborators", CollaboratorController, :set
    end
  end

  scope "/", Textshare do
    pipe_through :browser # Use the default browser stack

    get "/*path", IndexController, :index
  end
end
