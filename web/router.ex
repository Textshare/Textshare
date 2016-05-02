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
  end

  scope "/", Textshare do
    pipe_through :browser # Use the default browser stack

    get "/*path", IndexController, :index
  end


  scope "/api", Textshare do
    pipe_through :api

    scope "/v1" do
      post "/registrations", RegistrationController, :create
    end
  end
end
