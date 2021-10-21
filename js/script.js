let bookShelf = JSON.parse(localStorage.getItem('BOOK_SHELF')) || [] ;

window.addEventListener('load', function () {
    renderListOfBook()

    if (localStorage.getItem('BOOK_SHELF')) {
        bookShelf = JSON.parse(localStorage.getItem('BOOK_SHELF'));
    }

    const deleteBook = document.querySelectorAll('.fa-trash');
    const modal = document.querySelectorAll('.modal');
    for (let i = 0; i < deleteBook.length; i++) {
        deleteBook[i].addEventListener('click', function () {
            modal[i].style.display = "block";
        });
    }
    
    const closeModal = document.querySelectorAll('.fa-times');
    const deleteButton = document.querySelectorAll('.delete');
    for (let i = 0; i < modal.length; i++) {
        modal[i].addEventListener('click', function (event) {
            if (event.target == modal[i] || event.target == closeModal[i]) {
                modal[i].style.display = "none";
            } else if (event.target == deleteButton[i]) {
                const indexBook = getIndexBook(deleteBook[i].id);
                bookShelf.splice(indexBook, 1);
                localStorage.setItem('BOOK_SHELF', JSON.stringify(bookShelf));
                location.reload();
            }
        });
    }

    const statusBook = document.querySelectorAll('.status');
    for (let i = 0; i < statusBook.length; i++) {
        statusBook[i].addEventListener('click', function () {
            const indexBook = getIndexBook(statusBook[i].id)
            bookShelf[indexBook] = changeStatus(bookShelf[indexBook])

            localStorage.setItem('BOOK_SHELF', JSON.stringify(bookShelf));
            location.reload();
        });
    }
});

function getIndexBook(id) {
    let i = 0
    for (; i < bookShelf.length; i++) {
        if (id == bookShelf[i].id) {
            break;
        }
    }
    return i;
}

const inputBook = document.querySelector('#input');
inputBook.addEventListener('click', function () {
    const title = document.querySelector('#judul');
    const author= document.querySelector('#penulis');
    const year = document.querySelector('#tahun');
    const isComplete = document.querySelector('#dibaca').checked;
    const book = {
        id: Date.now(),
        title: title.value,
        author: author.value,
        year: year.value,
        isComplete: isComplete
    }

    console.log(book)
    if (!book.title == '' && !book.author == '' && !book.author == '') {
        document.querySelector('#judul').value = '';
        document.querySelector('#penulis').value = '';
        document.querySelector('#tahun').value = '';
        document.querySelector('#dibaca').checked = false;
        bookShelf.push(book);
        localStorage.setItem('BOOK_SHELF', JSON.stringify(bookShelf));
        location.reload();

    } else {
        alert('Ada Yang Salah');
    }
});

function setBook(list, data) {
    console.log(data.title);
    let book = document.createElement('div');
    book.setAttribute('id', data.id)
    book.classList.add('book');
    book.innerHTML += "<a href='#'><i class='fa fa-trash' id='" + data.id + "'></i></a>"
    book.innerHTML += "<h3>" + data.title + "</h3>";
    book.innerHTML += "<p>" + data.author + "</p>"
    if (data.isComplete == true) {
        book.innerHTML += "<a href='#' class='status' id=" + data.id + "><i class='fa fa-angle-double-left'></i> Belum Dibaca </a>";
    } else {
        book.innerHTML += "<a href='#' class='status' id=" + data.id + ">Selesai Dibaca <i class='fa fa-angle-double-right'></i></a>";
    }
    book.innerHTML += "<p>" + data.year + "</p>";
    book.innerHTML += "<div class='modal'><div class='content-modal'><i class='fa fa-times'></i><h3>Apakah Anda Yakin?</h3><p>Perintah menghapus buku akan bersifat <b>permanent</b>  atau tidak bisa dikembalikan!</p><button class='delete' id=" + data.id + "> Setuju</button></div></div>"
    list.appendChild(book);
}

function renderListOfBook() {
    let readed = document.querySelector('#readed');
    let unread = document.querySelector('#unread');

    for (let i = 0; i < bookShelf.length; i++) {
        if (bookShelf[i].isComplete == true) {
            setBook(readed, bookShelf[i]);
        } else {
            setBook(unread, bookShelf[i]);
        }
    }
}

function changeStatus(book) {
    if (book.isComplete == true) {
        book.isComplete = false;
    } else {
        book.isComplete = true;
    }
    return book;
}

const searchBook = document.querySelector('#search');
searchBook.addEventListener('keyup', function () {
    let query = searchBook.value;
    let book = document.querySelectorAll('.book');

    for (let i = 0; i < book.length; i++) {
        let text = book[i].innerText.toUpperCase().indexOf(query.toUpperCase());
        if (text > -1) {
            book[i].style.display = "";
        } else {
            book[i].style.display = "none";
        }

    }
});