workflow "New workflow" {
  on = "push"
  resolves = ["generate-json"]
}

action "generate-json" {
  uses = "debian"
  runs = "./generate-json"
}
