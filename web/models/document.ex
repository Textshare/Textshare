defmodule Textshare.Document do
  use Textshare.Web, :model
  @derive {Poison.Encoder, only: [:id, :title, :content, :row_ids, :inserted_at, :updated_at]}

  schema "documents" do
    field :title, :string
    field :content, :string
    field :row_ids, {:array, :string}

    belongs_to :owner, {"users", Textshare.User}, foreign_key: :user_id
    has_many :document_tags, Textshare.DocumentTag
    has_many :tags, through: [:document_tags, :tag]
    has_many :sharings, Textshare.Sharing
    has_many :collaborators, through: [:sharings, :user]

    timestamps
  end

  @required_fields ~w(title user_id)
  @optional_fields ~w(content row_ids)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:title, min: 1)
  end
end
