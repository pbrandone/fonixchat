defmodule Channels.FonixChatChannel do
  use Phoenix.Channel

  def join("fonixchat:" <> private_room_id, params, socket) do
    nickname = params |> Map.get("nickname")

    socket = assign(socket, :user, nickname)
    socket = assign(socket, :room, private_room_id)

    {:ok, socket}
  end

  def handle_in("new_order", %{"order_text" => order_text}, socket) do
    rand_num = :rand.uniform(100)
    nickname = socket.assigns[:user]

    message = %{
      :text => order_text,
      :id => UUID.uuid1(),
      :date_time => DateTime.utc_now |> DateTime.to_unix,
      :nickname => nickname
    }

    broadcast! socket, "new_order_accepted", message

   {:noreply, socket}
 end
end
