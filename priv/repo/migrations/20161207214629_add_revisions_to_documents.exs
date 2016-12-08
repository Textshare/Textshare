defmodule Textshare.Repo.Migrations.AddRevisionsToDocuments do
  use Ecto.Migration

  def up do
    create table(:revisions) do
      add :document_id, references(:documents, on_delete: :delete_all)
      add :content, :text
      add :row_ids, {:array, :string}

      timestamps
    end

    alter table(:documents) do
      add :revision_id, references(:revisions, on_delete: :nothing)
      remove :content
      remove :row_ids
    end
  end

  def down do
    drop table(:revisions)

    alter table(:documents) do
      remove :revision_id
      add :content, :text
      add :row_ids, {:array, :string}
    end
  end
end
