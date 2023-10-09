import { AppState } from "../AppState.js";
import { Note } from "../models/Note.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";




function _save() {
    saveState('notes', AppState.notes)
}


class NoteService {
    createNote(formData) {
        const newNote = new Note(formData)
        AppState.notes.push(newNote)
        // AppState.emit('notes')
        // console.log('newNote', newNote);

        _save()

        AppState.emit('amount')
        AppState.emit('notes')


    }

    setActiveNote(noteId) {
        const setNote = AppState.notes.find(note => note.id == noteId)
        AppState.activeNote = setNote
        // console.log('contents', setNote);

        _save()
    }

    saveActiveNotes(contents) {
        let activeNotes = AppState.activeNote
        activeNotes.description = contents


        // const newNote = new note(noteId)
        // AppState.notes.push(newNote)
        // AppState.emit('notes')



        _save()
    }

    removeNote(noteId) {
        const notes = AppState.notes
        const noteIndex = notes.findIndex(note => note.id == noteId)

        if (noteIndex == -1) {
            throw new Error('could not find note')
        }
        notes.splice(noteIndex, 1)
        _save()

        AppState.emit('notes')


    }


}


export const noteService = new NoteService()