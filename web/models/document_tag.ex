defmodule Textshare.DocumentTag do
  use Textshare.Web, :model

  schema "document_tags" do
    belongs_to :tag, Textshare.Tag
    belongs_to :document, Textshare.Document

    timestamps
  end

  @required_fields ~w(tag_id document_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:document_id_tag_id)
  end
end
