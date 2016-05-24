defmodule Textshare.DocumentView do
  use Textshare.Web, :view

  def render("index.json", %{documents: documents}) do
    documents
  end

  def render("error.json", _) do
  end
end
