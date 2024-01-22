// In the development of this project, I utilized OpenAI's ChatGPT,
// to assist with various aspects of coding, including troubleshooting, 
// code optimization, and the implementation of specific features.

import {
    MSG_LAST_RETRIEVED,
} from '../../lang/messages/en/user.js';

class NotesDisplay {
    constructor() {
        this.notesDisplayElement = document.getElementById('notesDisplay');
        this.updateInterval = 2000; // Update every 2 seconds
        this.startUpdating();
    }

    startUpdating() {
        this.updateNotes();
        setInterval(() => this.updateNotes(), this.updateInterval);
    }

    updateNotes() {
        // Retrieve notes from local storage or default to an empty array if none exist
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.notesDisplayElement.innerHTML = ''; 

        notes.forEach(note => {
            // Check and ignore empty or whitespace-only notes
            if (note.trim() !== '') {
                // Create a new element for this note and append it to the display
                const noteElement = this.createNoteElement(note);
                this.notesDisplayElement.appendChild(noteElement);
            }
        });

        // Update the 'last retrieved' time display
        document.querySelector('.save-time').innerText = MSG_LAST_RETRIEVED + new Date().toLocaleTimeString();
    }

    createNoteElement(noteContent) {
        const noteElement = document.createElement('div');
        // Add the 'note-container' class for styling
        noteElement.classList.add('note-container'); 
        noteElement.textContent = noteContent;
        return noteElement;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NotesDisplay();
});

