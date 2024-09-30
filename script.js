// notizen anzeigen
let notesTitle = [5, 8, 3]
let notes = ['Mandarinen', 'Apfel', 'Kirschen',]

let trashNotesTitle = [];
let trashNotes = [];


function init() {
    getFromLocalStorage ();
    renderNotes ();
    
}

function renderNotes() {
    // ich muss definieren wo sie anzulegen sind
let contentRef = document.getElementById ('content')

contentRef.innerHTML = '';

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        const note = notes[indexNote];
        contentRef.innerHTML += getnNoteTemplate (indexNote);
    }

}


function saveToLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notes))
}


function getFromLocalStorage() {
    const data = localStorage.getItem("notes")
    let obj = JSON.parse(data);

    if (obj && obj.length > 0) {
        notes = obj; // Zuweisung nur, wenn obj vorhanden ist und eine Länge > 0 hat
    }
}

function renderTrashNotes() {
    // ich muss definieren wo sie anzulegen sind
let trashContentRef = document.getElementById ('trash_content')

trashContentRef.innerHTML = '';

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate (indexTrashNote);
    }

}

function getTrashNoteTemplate(indexTrashNote) {

    return `<p>+ Menge: ${trashNotesTitle [indexTrashNote]} -> ${trashNotes[indexTrashNote]} <button onclick="deleteTrashNote(${indexTrashNote})">leeren</button></p>`

}


function getnNoteTemplate(indexNote) {

    return `<p>+ Menge: ${notesTitle[indexNote]} -> ${notes[indexNote]} <button onclick="deleteNote(${indexNote})">Notiz löschen</button></p>`

}


// notizen hinzufügen

function addNote() {
let noteInputRef = document.getElementById("note_input")
let noteInput = noteInputRef.value;

if(noteInputRef.value != ""){
    notes.push(noteInput);
}

saveToLocalStorage()




noteInputRef.value = "";

renderNotes ()
}


// notiz löschen

function deleteNote (indexNote){

   let trashNote = notes.splice(indexNote,1);
    trashNotes.push(trashNote[0]);

    let trashNoteTitle = notesTitle.splice(indexNote,1);
    trashNotesTitle.push(trashNoteTitle [0]);

    renderNotes ();

    renderTrashNotes ();

}

function deleteTrashNote (indexTrashNote){

    trashNotes.splice(indexTrashNote,1);

 
     renderTrashNotes ();
 
 }

// archivieren