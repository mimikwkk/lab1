// In the development of this project, I utilized OpenAI's ChatGPT,
// to assist with various aspects of coding, including troubleshooting, 
// code optimization, and the implementation of specific features.

import {
    MSG_NOT_SUPPORTED,
    MSG_LAST_SAVED,
    MSG_NOT_YET_SAVED,
    BTN_REMOVE_TEXT,
} from '../../lang/messages/en/user.js';

// Individual note
class Note {
    constructor(content, index, saveCallback) {
        this.content = content;
        this.index = index;
        this.saveCallback = saveCallback;
        this.element = this.createNoteElement();
    }

    createNoteElement() {
        const noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');

        const textarea = document.createElement('textarea');
        textarea.value = this.content;

        // Save the note content on each input event
        textarea.addEventListener('input', () => {
            this.content = textarea.value;
            this.saveCallback();
            this.saveNotes();
        });
        noteContainer.appendChild(textarea);

        // Add remove button to the note
        const removeButton = this.createRemoveButton();
        noteContainer.appendChild(removeButton);

        return noteContainer;
    }

    createRemoveButton() {
        const removeButton = document.createElement('button');
        removeButton.innerText = BTN_REMOVE_TEXT;
        removeButton.addEventListener('click', () => {
            this.saveCallback(true); 
        });
        return removeButton;
    }
}

class NotesManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.attachEventListeners();        
        this.renderNotes();
        this.updateLastSavedMessage(); 
    }

    attachEventListeners() {
        const addButton = document.getElementById('addButton');
        if (addButton) {
            addButton.addEventListener('click', () => this.addNewNote());
        }
    }

    renderNotes() {
        const notesArea = document.getElementById('notesArea');
        notesArea.innerHTML = ''; // Clear existing notes
        // Create and append each note to the display
        this.notes.forEach((noteContent, index) => {
            const note = new Note(noteContent, index, (isRemoval = false) => 
                this.handleNoteUpdate(index, isRemoval));
            notesArea.appendChild(note.element);
        });
    }

    handleNoteUpdate(index, isRemoval) {
        if (isRemoval) {
            this.removeNote(index);
        } else {
            const notesArea = document.getElementById('notesArea');
            this.notes[index] = notesArea.children[index].querySelector('textarea').value;
        }
        this.saveNotes(); // Save notes after any update
    }
    
    // add empty note, defer saving until user enters text
    addNewNote() {
        this.notes.push('');
        this.renderNotes();
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes.filter(note => note.trim() !== '')));
        const currentTime = new Date().toLocaleTimeString();
        localStorage.setItem('lastSaved', currentTime); // Store the last saved time
        this.updateLastSavedMessage();
    }

    updateLastSavedMessage() {
        const lastSaved = localStorage.getItem('lastSaved');
        if (lastSaved) {
            document.querySelector('.save-time').innerText = MSG_LAST_SAVED + lastSaved;
        } else {
            document.querySelector('.save-time').innerText = MSG_LAST_SAVED + MSG_NOT_YET_SAVED;
        }
    }

    removeNote(index) {
        this.notes.splice(index, 1); // Remove the note at the given index
        this.renderNotes();
        this.saveNotes();
    }
    
}

// Check for local storage support
if (typeof(Storage) === "undefined") {
    document.body.innerHTML = MSG_NOT_SUPPORTED;
    window.stop(); // Stop further script execution
} else {
    // Initialize the NotesManager when the DOM content is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        new NotesManager();
    });
}

