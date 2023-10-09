import { AppState } from "../AppState.js";
import { noteService } from "../services/NoteService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


function _drawNotes() {
    const notes = AppState.notes
    let content = ''
    notes.forEach(note => content += note.NotesForm);
    // console.log('draw notes works?', content);
    setHTML('notes', content)

    let number = 0
    number = AppState.notes.length
    setHTML('amount', number)
}

function _drawActiveNote() {
    const activeNote = AppState.activeNote
    // console.log('active note?', activeNote);
    setHTML('activeNote', activeNote.currentNote)
}



export class NoteController {
    constructor() {


        AppState.on('notes', _drawNotes)
        AppState.on('activeNote', _drawActiveNote)

    }

    setActiveNote(noteId) {
        noteService.setActiveNote(noteId)
    }

    createNote(event) {
        try {

            event.preventDefault()
            const form = event.target
            const formData = getFormData(form)
            noteService.createNote(formData)
            console.log('formData', formData);

            form.reset()
        } catch (error) {

        }



    }

    saveNote() {
        let content = document.getElementById('contents').value
        noteService.saveActiveNotes(content)
        Pop.success('Successful save!')

    }


    async removeNote(noteId) {
        const removeNote = await Pop.confirm('Are you sure!?!?!?!')

        if (!removeNote) {
            return
        }

        console.log('they wanna delete');
        noteService.removeNote(noteId)


    }

    // TODO create a date in the controller?




    // createText() {
    //     let noteElement = document.getElementById('contents')
    //     noteElement.focus()
    // }




}


