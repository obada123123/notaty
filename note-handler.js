const table = document.getElementById("notes-table")
function updateNotesTable(noteid, title) {
    let tabelCount = table.rows.length
    while (--tabelCount)
        table.deleteRow(tabelCount)
    getNote(title).then((data) => {
        data.forEach(note => {
            let row = table.insertRow(1);
            if (noteid == note["_id"]) {
                row.setAttribute("style", "animation: new-row 1s ease-in-out;")
            }
            row.insertCell(0).innerText = note["title"]
            row.insertCell(1).innerText = note["content"]
            row.insertCell(2).innerHTML = note["updateDate"]
            row.insertCell(3).innerHTML = `<a href="#" onclick="openEditModal('${note["_id"]}')"><img src="./images/edit.png" alt="edit" width="25px "></a>
                                            <a href="#" onclick="confirmDeleteNote('${note["_id"]}')"><img src="./images/delete.png" alt="delete" width="25px "></a>`
        })
    }).catch((err) => {
        console.log("error in updata the notes " + err)
    })
}
function searchNotes() {
    const title = document.getElementById("searchInput").value
    updateNotesTable(undefined, title)
}
function confirmDeleteNote(id) {
    if (confirm("Are you sure you want to delete this note?")) {
        deleteNote(id).then(() => {
            updateNotesTable(undefined, undefined)
        }).catch((err) => {
            console.log("error in deleting note " + err)
        })
    }
}


