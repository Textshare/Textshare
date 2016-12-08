defmodule Textshare.Document do
  use Textshare.Web, :model
  @derive {Poison.Encoder, only: [:id, :title, :inserted_at, :updated_at]}

  schema "documents" do
    field :title, :string

    belongs_to :owner, {"users", Textshare.User}, foreign_key: :user_id
    belongs_to :revision, {"revisions", Textshare.Revision}, foreign_key: :revision_id
    has_many :revisions, Textshare.Revision
    has_many :document_tags, Textshare.DocumentTag
    has_many :tags, through: [:document_tags, :tag]
    has_many :sharings, Textshare.Sharing
    has_many :collaborators, through: [:sharings, :user]

    timestamps
  end

  @required_fields ~w(title user_id)
  @optional_fields ~w(revision_id)

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
