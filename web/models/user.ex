defmodule Textshare.User do
  use Textshare.Web, :model
  @derive {Poison.Encoder, only: [:id, :name, :email]}

  schema "users" do
    field :name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    has_many :own_documents, Textshare.Document
    has_many :sharings, Textshare.Sharing
    has_many :shared_documents, through: [:sharings, :document]

    timestamps
  end

  @required_fields ~w(name email password)
  @optional_fields ~w(encrypted_password)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 8)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  def generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password} } ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end
