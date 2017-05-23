defmodule FonixChat.PageController do
  use FonixChat.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
