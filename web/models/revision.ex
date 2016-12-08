defmodule Textshare.Revision do
  use Textshare.Web, :model
  @derive {Poison.Encoder, only: [:id, :content, :row_ids, :inserted_at, :updated_at]}

  schema "revisions" do
    field :content, :string
    field :row_ids, {:array, :string}

    belongs_to :document, {"documents", Textshare.Document}, foreign_key: :document_id

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(content row_ids)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
