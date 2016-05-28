defmodule Textshare.DocumentView do
  use Textshare.Web, :view

  def render("index.json", %{documents: documents}) do
    documents
  end

  def render("show.json", %{document: document}) do
    document
  end

  def render("delete.json", %{document: document}) do
    document
  end

  def render("error.json", _) do
  end
end
