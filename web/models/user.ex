defmodule Textshare.User do
  use Textshare.Web, :model

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string

    has_many :documents, Textshare.Document
    has_many :sharings, Textshare.Sharing
    has_many :shared_documents, through: [:sharings, :document]

    timestamps
  end

  @required_fields ~w(name email password)
  @optional_fields ~w()

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
