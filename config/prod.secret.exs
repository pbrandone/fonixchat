use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or you later on).
config :fonixchat, FonixChat.Endpoint,
  secret_key_base: "DP87bTOoWgiFbXH/7/bAmQlJCFWof+kn/P5A/1bsi0MHFTZfsy8C8UDAliVgva2z"

# Configure your database
config :fonixchat, FonixChat.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "catech_prod",
  pool_size: 20
