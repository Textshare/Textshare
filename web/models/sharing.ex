defmodule Textshare.Sharing do
  use Textshare.Web, :model

  schema "sharings" do
    field :permission, :string
    belongs_to :user, Textshare.User
    belongs_to :document, Textshare.Document

    timestamps
  end

  @required_fields ~w(permission user_id document_id)
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
