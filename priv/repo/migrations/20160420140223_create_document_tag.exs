defmodule Textshare.Repo.Migrations.CreateDocumentTag do
  use Ecto.Migration

  def change do
    create table(:document_tags) do
      add :tag_id, references(:tags, on_delete: :delete_all)
      add :document_id, references(:documents, on_delete: :delete_all)

      timestamps
    end
    create index(:document_tags, [:tag_id])
    create index(:document_tags, [:document_id])

  end
end
