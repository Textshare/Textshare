defmodule Textshare.RevisionView do
  use Textshare.Web, :view

  def render("index.json", %{revisions: revisions}) do
    render_many(revisions, __MODULE__, "show.json", as: :revision)
  end

  def render("show.json", %{revision: revision}) do
    revision
  end

  def render("delete.json", %{revision: revision}) do
    revision
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
