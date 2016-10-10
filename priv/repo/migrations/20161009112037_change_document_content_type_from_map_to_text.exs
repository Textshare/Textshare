defmodule Textshare.Repo.Migrations.ChangeDocumentContentTypeFromMapToText do
  use Ecto.Migration

  def up do
    alter table(:documents) do
      modify :content, :text
    end
  end

  def down do
    alter table(:documents) do
      modify :content, :map
    end
  end
end
