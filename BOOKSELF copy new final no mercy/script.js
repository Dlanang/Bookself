const books = JSON.parse(localStorage.getItem('books')) || [];

function renderBooks() {
  const completedList = document.getElementById('completed-list');
  const uncompletedList = document.getElementById('uncompleted-list');
  completedList.innerHTML = '';
  uncompletedList.innerHTML = '';

  // Ambil kata kunci pencarian dari input
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim().toLowerCase();

  books.forEach(book => {
    // Ubah judul dan penulis buku menjadi huruf kecil untuk pencocokan yang tidak peka terhadap huruf besar/kecil
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();

    // Periksa apakah judul atau penulis buku cocok dengan kata kunci pencarian
    if (title.includes(searchTerm) || author.includes(searchTerm)) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${book.title} oleh ${book.author} (${book.year})</span>
        <button class="delete-button">Hapus</button>
        <button class="move-button">${book.isComplete ? 'Belum Selesai' : 'Sudah Selesai'}</button>
      `;
      const deleteButton = li.querySelector('.delete-button');
      deleteButton.addEventListener('click', () => {
        deleteBook(book.id);
        renderBooks();
      });

      const moveButton = li.querySelector('.move-button');
      moveButton.addEventListener('click', () => {
        toggleCompleteStatus(book.id);
        renderBooks();
      });

      const icon = document.createElement('i');
      icon.classList.add('fas', book.isComplete ? 'fa-book' : 'fa-book-open');
      li.prepend(icon);

      if (book.isComplete) {
        completedList.appendChild(li);
      } else {
        uncompletedList.appendChild(li);
      }
    }
  });

  // Simpan data buku ke local storage setiap kali terjadi perubahan
  saveBooksToLocalStorage();
}

// Fungsi untuk menambahkan buku baru
function addBook(title, author, year, isComplete) {
  const newBook = {
    id: Date.now(),
    title,
    author,
    year: parseInt(year),
    isComplete: isComplete === 'true',
  };
  books.push(newBook);
  renderBooks();
}

// Fungsi untuk menghapus buku
function deleteBook(id) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    renderBooks();
  }
}

// Fungsi untuk mengubah status selesai atau belum selesai dari buku
function toggleCompleteStatus(id) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index].isComplete = !books[index].isComplete;
    renderBooks();
  }
}

// Fungsi untuk menyimpan data buku ke local storage
function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Event listener untuk menangani penambahan buku dari form
document.getElementById('add-book-form').addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const isComplete = document.getElementById('isComplete').value;
  addBook(title, author, year, isComplete);
  event.target.reset();
});

// Event listener untuk tombol pencarian
document.getElementById('search-button').addEventListener('click', () => {
  renderBooks();
});

// Event listener untuk input pencarian secara langsung saat pengguna mengetik
document.getElementById('search-input').addEventListener('input', () => {
  renderBooks();
});

// Render buku saat halaman dimuat
renderBooks();

// Data buku awal untuk disimpan di local storage
const initialBooks = [
  {
    id: Date.now(),
    title: 'UI: Kisah Dua Universitas',
    author: 'Djoko Soedarmadji Djojohadikusumo',
    year: 2010,
    isComplete: false
  },
  {
    id: Date.now() + 1,
    title: 'Menjadi Sarjana UI: Panduan Bagi Mahasiswa Baru',
    author: 'Tim UI',
    year: 2023,
    isComplete: false
  },
  {
    id: Date.now() + 2,
    title: 'Inovasi dan Kewirausahaan di UI: Sebuah Kajian',
    author: 'Tim FEB UI',
    year: 2019,
    isComplete: false
  },
  {
    id: Date.now() + 3,
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    year: 2008,
    isComplete: false
  },
  {
    id: Date.now() + 4,
    title: 'Negeri 5 Menara',
    author: 'Ahmad Fuadi',
    year: 2009,
    isComplete: false
  },
  {
    id: Date.now() + 5,
    title: 'Orang-Orang Biasa',
    author: 'Andrea Hirata',
    year: 2011,
    isComplete: false
  }
];

// Simpan data buku awal ke local storage
localStorage.setItem('books', JSON.stringify(initialBooks));
