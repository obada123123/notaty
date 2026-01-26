function openAddModal() {
    let mod = document.getElementById("addNoteModal");
    let closeAdd = document.getElementById("closeAdd");
    let cancelAddNoteBtn = document.getElementById("cancelAddNoteBtn");

    mod.style.display = "block";
    clearModalAdd()
    closeAdd.onclick = () => {
        mod.style.display = "none";
    };
    cancelAddNoteBtn.onclick = () => {
        mod.style.display = "none";
    };
}
function clearModalAdd() {
    let titlestr = document.getElementById("addTitle")
    let contentstr = document.getElementById("addContent")
    let err = document.getElementById("addError")
    titlestr.value = ''
    contentstr.value = ''
    err.value = ''
}
function saveNewNote() {
    let titlestr = document.getElementById("addTitle").value;
    let contentstr = document.getElementById("addContent").value;
    let newNote = { title: titlestr, content: contentstr }

    addNote(newNote).then((response) => {
        if (response.ok) {
            let mod = document.getElementById("addNoteModal");
            mod.style.display = "none";
            response.json().then((data) => {
                updateNotesTable(data["_id"]);
            })
        } else {
            response.text().then((err) => {
                console.log(err);
                document.getElementById("addError").innerHTML = err;
            }).catch(err => {
                console.log(err);
                document.getElementById("addError").innerHTML = err;
            })
        }
    }).catch(err => {
        console.log(err);
        document.getElementById("addError").innerHTML = err;
    })

}

function openEditModal(noteid) {
    let mod = document.getElementById("editNoteModal");
    let closeEdit = document.getElementById("closeEdit");
    let cancelEditNoteBtn = document.getElementById("cancelEditNoteBtn");

    mod.style.display = "block";
    clearModalEdit()
    closeEdit.onclick = () => {
        mod.style.display = "none";
    };
    cancelEditNoteBtn.onclick = () => {
        mod.style.display = "none";
    };
    loadNoteData(noteid);
}
function loadNoteData(noteid) {
    let mod = document.getElementById("editNoteModal");
    let noteAtr = document.createAttribute("noteid");
    noteAtr.value = noteid;
    mod.setAttributeNode(noteAtr);

    getNotebyId(noteid).then(data => {
        document.getElementById("editTitle").value = data["title"]
        document.getElementById("editContent").value = data["content"]
    })
}
function clearModalEdit() {
    let titlestr = document.getElementById("editTitle")
    let contentstr = document.getElementById("editContent")
    let err = document.getElementById("editError")
    titlestr.value = ''
    contentstr.value = ''
    err.value = ''

}
function saveEditNote() {
    let mod = document.getElementById("editNoteModal");
    let titlestr = document.getElementById("editTitle").value
    let contentstr = document.getElementById("editContent").value
    let noteId = mod.getAttribute("noteid")
    let newNote = { _id: noteId, title: titlestr, content: contentstr }
    updateNote(newNote).then((response) => {
        if (response.ok) {
            mod.style.display = "none";
            updateNotesTable(noteId);
        } else {
            response.text().then((err) => {
                document.getElementById("editError").innerHTML = err;
            }).catch(err => {
                document.getElementById("editError").innerHTML = err;
            })
        }
    }).catch(err => {
        console.log(err);
        document.getElementById("editError").innerHTML = err;
    })
}