defmodule Textshare.Repo.Migrations.CreateSharing do
  use Ecto.Migration

  def change do
    create table(:sharings) do
      add :permission, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :document_id, references(:documents, on_delete: :nothing)

      timestamps
    end
    create index(:sharings, [:user_id])
    create index(:sharings, [:document_id])

  end
end
