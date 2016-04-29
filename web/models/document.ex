defmodule Textshare.Document do
  use Textshare.Web, :model

  schema "documents" do
    field :title, :string
    field :content, {:array, :string}

    belongs_to :owner, {"users", Textshare.User}, foreign_key: :user_id
    has_many :document_tags, Textshare.DocumentTag
    has_many :tags, through: [:document_tags, :tag]
    has_many :sharings, Textshare.Sharing
    has_many :collaborators, through: [:sharings, :user]

    timestamps
  end

  @required_fields ~w(title user_id)
  @optional_fields ~w(content)

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
