defmodule Textshare.Repo.Migrations.CreateDocument do
  use Ecto.Migration

  def change do
    create table(:documents) do
      add :title, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :content, :map

      timestamps
    end
    create index(:documents, [:user_id])

  end
end
