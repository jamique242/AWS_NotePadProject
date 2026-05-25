// app.js

const notesContainer = document.getElementById("notesContainer");

const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");

const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("searchInput");

const noteCounter = document.getElementById("noteCounter");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let notes = [];
let currentIndex = 0;

/*
  API Endpoint
*/
const API_URL = {taken out};

async function fetchNotes() {

  try {

    const response = await fetch(API_URL);

    notes = await response.json();

    renderNotes();

  } catch (error) {

    console.error("Error fetching notes:", error);

  }

}

fetchNotes();


function renderNotes(filteredNotes = notes) {

  notesContainer.innerHTML = "";

  noteCounter.textContent = `${filteredNotes.length} Notes`;

  if (filteredNotes.length === 0) {

    notesContainer.innerHTML = `
      <div class="empty-message">
        No notes found ✏️
      </div>
    `;

    return;
  }

  filteredNotes.forEach((note, index) => {

    const noteCard = document.createElement("div");

    noteCard.classList.add("note-card");

    if (index === currentIndex) {
      noteCard.style.transform = "scale(1.01)";
    }


    noteCard.innerHTML = `
      <div class="note-title">${note.title}</div>

      <div class="note-body">
        ${note.note}
      </div>

      <div class="note-date">
        ${new Date(note.updated_at||note.created_at).toLocaleString()}
      </div>

      <div class="note-actions">

        <button class="edit-btn" onclick="editNote('${note.noteId}')">
          Edit
        </button>

        <button class="delete-btn" onclick="deleteNote('${note.noteId}')">
          Delete
        </button>

      </div>
    `;

    notesContainer.appendChild(noteCard);

  });

}

/* -------------------------------- */
/* ADD NOTE */
/* -------------------------------- */

addBtn.addEventListener("click", async () => {

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    alert("Please fill out both fields.");
    return;
  }

  try {

    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        title,
        note: body
      })

    });

    titleInput.value = "";
    bodyInput.value = "";

    fetchNotes();

  } catch (error) {

    console.error("Error creating note:", error);

  }

});

/* -------------------------------- */
/* DELETE NOTE */
/* -------------------------------- */

async function deleteNote(id) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) return;

  try {

    await fetch(`${API_URL}/${id}`, {

      method: "DELETE"

    });

    fetchNotes();

  } catch (error) {

    console.error("Error deleting note:", error);

  }

}


/* -------------------------------- */
/* EDIT NOTE */
/* -------------------------------- */

async function editNote(id) {

  const note = notes.find(note => note.noteId === id);

  const updatedTitle = prompt(
    "Edit title:",
    note.title
  );

  const updatedBody = prompt(
    "Edit note:",
    note.note
  );

  if (updatedTitle !== null) {
    note.title = updatedTitle;
  }

  if (updatedBody !== null) {
    note.note = updatedBody;
  }

  try {

    await fetch(`${API_URL}/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        title: updatedTitle,
        note: updatedBody
      })

    });

    titleInput.value = "";
    bodyInput.value = "";

    fetchNotes();

  } catch (error) {

    console.error("Error updating note:", error);

  }

}

/* -------------------------------- */
/* SEARCH */
/* -------------------------------- */

searchInput.addEventListener("input", (e) => {

  const searchTerm = e.target.value.toLowerCase();

  const filteredNotes = notes.filter(note => {

    return (
      note.title.toLowerCase().includes(searchTerm) ||
      note.body.toLowerCase().includes(searchTerm)
    );

  });

  renderNotes(filteredNotes);

});

/* -------------------------------- */
/* NOTE NAVIGATION */
/* -------------------------------- */

nextBtn.addEventListener("click", () => {

  if (notes.length === 0) return;

  currentIndex++;

  if (currentIndex >= notes.length) {
    currentIndex = 0;
  }

  renderNotes();

});

prevBtn.addEventListener("click", () => {

  if (notes.length === 0) return;

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = notes.length - 1;
  }

  renderNotes();

});

/* -------------------------------- */
/* INITIAL RENDER */
/* -------------------------------- */

renderNotes();
