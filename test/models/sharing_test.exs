defmodule Textshare.SharingTest do
  use Textshare.ModelCase

  alias Textshare.Sharing

  @valid_attrs %{permission: "some content", user_id: 1, document_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Sharing.changeset(%Sharing{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Sharing.changeset(%Sharing{}, @invalid_attrs)
    refute changeset.valid?
  end
end
