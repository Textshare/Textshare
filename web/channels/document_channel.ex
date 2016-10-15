defmodule Textshare.DocumentChannel do
  use Phoenix.Channel

  def join("document:" <> document_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("document_changed", %{"body" => body}, socket) do
    broadcast! socket, "document_changed", %{body: body}
    {:noreply, socket}
  end
end
