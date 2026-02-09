
//const basUrl = "http://localhost:3000"; // Localhost for development
const basUrl = "https://obada-notaty-e583154a15da.herokuapp.com"; // Production URL
async function addNote(newNote) {
    return await fetch(`${basUrl}/notes`, {
        method: "POST", // deafult is GET
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote)
    })
}
async function deleteNote(id) {
    return await fetch(`${basUrl}/notes/${id}`, {
        method: "DELETE"
    })
}
async function updateNote(note) {
    return await fetch(`${basUrl}/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
    })
}
async function getNotebyId(id) {
    return (await fetch(`${basUrl}/notes/${id}`)).json()
}
async function getNote(title) {
    let url = basUrl + "/notes"
    if (title)
        url += `/?title=${title}`
    return (await fetch(url)).json()
}
