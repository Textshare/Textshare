defmodule Textshare.IndexControllerTest do
  use Textshare.ConnCase

  test "main endpoint's response contains an entry point for React app", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "<div id=\"main\">"
  end
end
