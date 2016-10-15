defmodule Textshare.UserSocket do
  use Phoenix.Socket

  alias Textshare.Repo
  alias Textshare.User

  channel "document:*", Textshare.DocumentChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        "User:" <> id = claims["sub"]
        case Repo.get(User, String.to_integer(id)) do
          nil ->
            :error
          user ->
            {:ok, assign(socket, :current_user, user)}
        end
      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket), do: :error

  def id(socket), do: "user_socket:#{socket.assigns.current_user.id}"
end
