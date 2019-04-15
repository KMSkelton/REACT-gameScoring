export const handleNameChange = (e) => {
  let name = e.target.value
  if (e.target.value === "") {
    name = "Human Player"
  }
  return { user: name }
}