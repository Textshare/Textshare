# Textshare

## Prerequisites

  * Erlang
  * Elixir
  * PostgreSQL
  * Node.js

## Setup:

  * Install dependencies with `mix deps.get`
  * Create a PostgreSQL role according to the settings in `./config/dev.exs`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Webpack with `npm run build:dev`
  * Start Phoenix endpoint with `iex -S mix phoenix.server`
  * Visit [`localhost:4000`](http://localhost:4000)

