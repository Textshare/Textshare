defmodule Textshare.CollaboratorView do
  use Textshare.Web, :view

  def render("index.json", %{collaborators: collaborators}) do
    render_many(collaborators, __MODULE__, "show.json", as: :collaborator)
  end

  def render("show.json", %{collaborator: collaborator}) do
    %{
      id: collaborator.id,
      value: collaborator.id,
      label: collaborator.email
    }
  end

  def render("set.json", %{collaborators: collaborators, possible_collaborators: possible_collaborators}) do
    %{
      collaborators: render_one(collaborators, __MODULE__, "index.json", as: :collaborators),
      possible_collaborators: render_one(possible_collaborators, __MODULE__, "index.json", as: :collaborators),
    }
  end
end
