const myLibrary = [];
const modalOverlay = document.getElementById('modal-overlay');
const addBookForm = document.getElementById('add-book-form');
const addBookBtn = document.getElementById('add_Books');
const STATUS_UI = {
    belum_baca: { 
        label: 'Belum Dibaca', 
        class: 'bg-secondary-container text-on-secondary-container' 
    },
    sudah_baca: { 
        label: 'Sudah Dibaca', 
        class: 'bg-primary-container text-on-primary-container' 
    }
};

function book (title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
  displayBooks();
};

function addBookToLibrary (title, author, pages, read) {
    const newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();

}

function displayBooks(){
    const container = document.getElementById('books-grid');
    container.innerHTML = '';
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        const statusData = book.read ? STATUS_UI.sudah_baca : STATUS_UI.belum_baca;
        card.className = 'group cursor-pointer bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 book-card-hover transition-all duration-300';
        card.classList.add('book-card');
        card.dataset.bookId = book.id;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${statusData.class}">${statusData.label}</span>
                <button class="remove-btn size-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-error-container hover:text-error transition-colors active:scale-90" title="Remove title"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
            </div>
            <div class="mb-6">
                <h4 class="font-headline text-headline-sm text-on-surface mb-1 truncate">${book.title}</h4>
                <p class="font-body text-on-surface-variant">${book.author}</p>
                <p class="font-label text-label-sm text-on-surface-variant/70 mt-1">${book.pages} Halaman</p>
            </div>
            <button class="toggle-read-btn w-full py-2 px-3 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 text-label-md font-label text-on-surface-variant group-hover:border-primary-container group-hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z"/></svg> Ganti Status</button>
        `;
        card.querySelector('.remove-btn').addEventListener('click', () => removeBook(book.id));
        card.querySelector('.toggle-read-btn').addEventListener('click', () => book.toggleReadStatus());
        container.appendChild(card);
    });
}

function openModal() {
  modalOverlay.classList.remove('hidden');
  modalOverlay.classList.add('flex');
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  modalOverlay.classList.remove('flex');
  addBookForm.reset();
  addBookForm.querySelectorAll('.field-error').forEach(el => el.remove());
  addBookForm.querySelectorAll('input:not([type=checkbox])').forEach(input => {
    input.classList.remove('border-error');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  });
}

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (document.activeElement?.blur) document.activeElement.blur(); // ponytail: defocus so Enter-submit on invalid input still shows errors
  const inputs = [...addBookForm.querySelectorAll('input:not([type=checkbox])')];
  if (!inputs.every(validateField)) return;

  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').checked;

  addBookToLibrary(title, author, pages, read);
  closeModal();
});

// ponytail: blur-only validation per assignment; native validity API + aria-describedby wiring
function validateField(input) {
  if (input.type === 'checkbox') return true;
  const valid = input.checkValidity();
  const showError = !valid && document.activeElement !== input;
  input.classList.toggle('border-error', showError);
  input.setAttribute('aria-invalid', String(!valid));
  let err = input.parentElement.querySelector('.field-error');
  if (showError) {
    if (!err) {
      err = document.createElement('p');
      err.id = `${input.id}-error`;
      err.className = 'field-error text-error text-label-sm mt-1 font-label';
      input.parentElement.appendChild(err);
      input.setAttribute('aria-describedby', err.id);
    }
    err.textContent = input.validationMessage;
  } else if (err) {
    err.remove();
    input.removeAttribute('aria-describedby');
  }
  return valid;
}

addBookForm.querySelectorAll('input:not([type=checkbox])').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
});


function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex(book => book.id === bookId);

  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}

addBookBtn.addEventListener('click', openModal);

// Contoh pengujian manual
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('1984', 'George Orwell', 328, true);