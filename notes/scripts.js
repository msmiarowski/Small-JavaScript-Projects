/* 
  a note taking app that uses localstorage to store your notes
  "global" variables for this app
*/

const addBox = document.querySelector('.add-note'),
popupBox = document.querySelector('#popup-wrapper'),
popupTitle = popupBox.querySelector('header p'),
closeIcon = document.querySelector('header i'),
formTitle = document.querySelector('input'),
formDesc = document.querySelector('textarea'),
addBtn = document.querySelector('#add-btn'),
btnText = addBtn.querySelector('.btn-text'),
deleteAllBtn = document.querySelector('.delete-all-btn');

const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false;
let updateId;


// get all notes from localstorage -> show in dom
function showNotes() {
  document.querySelectorAll('.note').forEach(note => note.remove());
  
  notes.length === 0 ? deleteAllBtn.disabled = true : deleteAllBtn.disabled = false;

  notes.forEach((note, i) => {
    let el = `<li class="note">
      <div class="details">
        <p>${note.title}</p>
        <span>${note.description}</span>
      </div>
      <div class="bottom-content">
        <span>${note.date}</span>
        <div class="settings">
          <i onClick="editNote(${i}, '${note.title}', '${note.description}')"  class="fa-solid fa-pen-to-square"></i>
          <i onClick="deleteNote(${i})" class="fa-solid fa-trash"></i>
        </div>
      </div>
    </li>`;
    addBox.insertAdjacentHTML('afterend', el);
  });
}

showNotes();


// show popup to create a new note
addBox.addEventListener('click', () => {
  formTitle.focus();
  popupBox.classList.add('show');
});


// close popup & reset new note form
closeIcon.addEventListener('click', () => {
  isUpdate = false;
  formTitle.value = '';
  formDesc.value = '';
  btnText.innerText = 'Add Note';
  popupTitle.innerText = 'Add a new Note';
  popupBox.classList.remove('show');
});


// add a note to DOM & localstorage
addBtn.addEventListener('click', (e) => {
  e.preventDefault(); // don't submit that form bruh!
  let noteTitle = formTitle.value;
  let noteDesc = formDesc.value;
  if(noteTitle || noteDesc) {
    let dateEl = new Date(),
    month = months[dateEl.getMonth()],
    day = dateEl.getDate(),
    year = dateEl.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day} ${year}`
    };

    if(!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});


// delete a note from DOM & localstorage
function deleteNote(i) {
  let confirmDelete = confirm('Are you sure you want to delete this note?');
  if(!confirmDelete) return;
  notes.splice(i, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  showNotes();
}


// edit an existing note
function editNote(i, title, desc) {
  isUpdate = true;
  updateId = i;
  addBox.click();
  formTitle.value = title;
  formDesc.value = desc;
  btnText.innerText = 'Edit Note';
  popupTitle.innerText = 'Editing a Note';
}


// delete ALL notes
deleteAllBtn.addEventListener('click', () => {
  let confirmAll = confirm('Are you sure you want to delete ALL notes?');
  if(!confirmAll) return;
  notes.splice(0, notes.length);
  localStorage.removeItem('notes');
  showNotes();
});