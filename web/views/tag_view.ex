defmodule Textshare.TagView do
  use Textshare.Web, :view

  def render("index.json", %{tags: tags}) do
    tags
  end

  def render("show.json", %{tag: tag}) do
    tag
  end

  def render("delete.json", _) do
  end

  def render("error.json", _) do
  end
end
