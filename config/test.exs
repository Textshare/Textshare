use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :textshare, Textshare.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :textshare, Textshare.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "textshare",
  password: "",
  database: "textshare_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
