defmodule Textshare.DocumentView do
  use Textshare.Web, :view

  def render("index.json", %{documents: documents}) do
    render_many(documents, __MODULE__, "show.json", as: :document)
  end

  def render("show.json", %{document: document}) do
    %{
      id: document.id,
      title: document.title,
      content: document.content,
      row_ids: document.row_ids,
      inserted_at: document.inserted_at,
      updated_at: document.updated_at,
      owner: render_one(document.owner, Textshare.CurrentUserView, "show.json", as: :user),
      tags: render_many(document.tags, Textshare.TagView, "show.json", as: :tag)
    }
  end

  def render("delete.json", %{document: document}) do
    document
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Enum.reduce(changeset.errors, %{}, fn({field, detail}, acc) ->
      acc |> Map.put(field, traverse_errors(detail))
    end)
    %{ errors: errors }
  end

  defp traverse_errors(detail) do
    case detail do
      {msg, opts} -> Enum.reduce(opts, msg, fn({opt_name, opt_value}, acc) ->
        String.replace(acc, "%{#{opt_name}}", Integer.to_string(opt_value))
      end)
      msg -> msg
    end
  end
end
