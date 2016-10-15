defmodule Textshare.Repo.Migrations.AddRowIdsToDocument do
  use Ecto.Migration

  def change do
    alter table(:documents) do
      add :row_ids, {:array, :string}
    end
  end
end
