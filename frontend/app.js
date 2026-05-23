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
  Replace with your API Gateway endpoint later
*/
const API_URL = "YOUR_API_GATEWAY_URL";

/* -------------------------------- */
/* SAMPLE NOTES */
/* -------------------------------- */

notes = [
  {
    id: 1,
    title: "Math Study Guide",
    body: "Review formulas and practice equations before Friday.",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Weekend Plans",
    body: "Movies, snacks, and maybe a trip to the park.",
    createdAt: new Date()
  }
];

/* -------------------------------- */
/* RENDER NOTES */
/* -------------------------------- */

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
        ${note.body}
      </div>

      <div class="note-date">
        ${new Date(note.createdAt).toLocaleString()}
      </div>

      <div class="note-actions">

        <button class="edit-btn" onclick="editNote(${note.id})">
          Edit
        </button>

        <button class="delete-btn" onclick="deleteNote(${note.id})">
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

addBtn.addEventListener("click", () => {

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    alert("Please fill out both fields.");
    return;
  }

  const newNote = {
    id: Date.now(),
    title,
    body,
    createdAt: new Date()
  };

  notes.unshift(newNote);

  titleInput.value = "";
  bodyInput.value = "";

  renderNotes();

});

/* -------------------------------- */
/* DELETE NOTE */
/* -------------------------------- */

function deleteNote(id) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) return;

  notes = notes.filter(note => note.id !== id);

  renderNotes();

}

/* -------------------------------- */
/* EDIT NOTE */
/* -------------------------------- */

function editNote(id) {

  const note = notes.find(note => note.id === id);

  const updatedTitle = prompt(
    "Edit title:",
    note.title
  );

  const updatedBody = prompt(
    "Edit note:",
    note.body
  );

  if (updatedTitle !== null) {
    note.title = updatedTitle;
  }

  if (updatedBody !== null) {
    note.body = updatedBody;
  }

  renderNotes();

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
