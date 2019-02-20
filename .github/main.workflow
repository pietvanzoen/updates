workflow "New workflow" {
  on = "push"
  resolves = ["generate-json"]
}

action "generate-json" {
  uses = "pietvanzoen/updates@master"
  runs = "./generate-json"
}
