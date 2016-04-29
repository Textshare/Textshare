defmodule Textshare.DocumentTagTest do
  use Textshare.ModelCase

  alias Textshare.DocumentTag

  @valid_attrs %{document_id: 1, tag_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = DocumentTag.changeset(%DocumentTag{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = DocumentTag.changeset(%DocumentTag{}, @invalid_attrs)
    refute changeset.valid?
  end
end
