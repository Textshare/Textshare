alias Textshare.{Repo, User}

[
  %{
    name: "Walter White",
    email: "walter.white@textshare.com",
    password: "password"
  },
]
|> Enum.map(&User.changeset(%User{}, &1))
|> Enum.each(&Repo.insert!(&1))
