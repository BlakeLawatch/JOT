import { generateId } from "../utils/GenerateId.js"




export class Note {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.color = data.color
    this.updatedAt = data.updatedAt ? new Date().toLocaleString() : new Date();
    this.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString()
    this.description = data.description || ''
  }

  get NotesForm() {
    return `
    <div class="col-4">
      <section data-bs-toggle="offcanvas" type="button" onclick="app.NoteController.setActiveNote('${this.id}')" class="row d-flex form my-2" style="border-color: ${this.color};">
        <div>
          ${this.name}
        </div>
      </section>
    </div>
    `
  }

  get currentNote() {
    return `
       
        <div class="col-12 col-md-6 text-center justify-content-end">
        <p class="fw-bold form" style="border-color: ${this.color};">${this.name}</p>
        <p>Date Created: ${this.createdAt}</p>
        <p>Date Updated: ${this.updatedAt}</p>
        <textarea name="" id="contents" cols="50" placeholder="Notes here..." rows="10">${this.description}</textarea>
        <button onclick="app.NoteController.saveNote(contents)" class="btn btn-primary rounded-pill" >Save</button>
        <button onclick="app.NoteController.removeNote('${this.id}')" class="btn btn-danger rounded-pill">Delete</button>
        </div>`
  }

}