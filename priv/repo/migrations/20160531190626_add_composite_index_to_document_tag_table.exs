defmodule Textshare.Repo.Migrations.AddCompositeIndexToDocumentTagTable do
  use Ecto.Migration

  def change do
    create index(:document_tags, [:document_id, :tag_id], unique: true)
  end
end
