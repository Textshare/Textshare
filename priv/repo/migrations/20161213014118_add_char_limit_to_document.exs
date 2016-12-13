defmodule Textshare.Repo.Migrations.AddCharLimitToDocument do
  use Ecto.Migration

  def change do
    alter table(:documents) do
      add :limit, :integer, default: nil
    end
  end
end
