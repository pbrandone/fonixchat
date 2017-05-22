# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
#config :fonixchat,
#  ecto_repos: [FonixChat.Repo]

# Configures the endpoint
config :fonixchat, FonixChat.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "p3+DOB3I8x4vBakVCvP+jmFotlDn3sliy+BGS3+SfwhMaT10jCsVEWSOXVNWp4Ej",
  render_errors: [view: FonixChat.ErrorView, accepts: ~w(html json)],
  pubsub: [name: FonixChat.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
