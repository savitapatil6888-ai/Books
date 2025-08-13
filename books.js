// Book data
const books = [
    {
        cover: "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 499
    },
    {
        cover: "https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_UF1000,1000_QL80_.jpg",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 399
    },
    {
        cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
        title: "1984",
        author: "George Orwell",
        price: 349
    },
    {
        cover: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 429
    },
    {
        cover: "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 599
    },
    {
        cover: "https://m.media-amazon.com/images/I/81OthjkJBuL._AC_UF1000,1000_QL80_.jpg",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 299
    },
    {
        cover: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350
    },
    {
        cover: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 499
    },
    {
        cover: "https://m.media-amazon.com/images/I/91SZSW8qSsL._AC_UF1000,1000_QL80_.jpg",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        price: 899
    },
    {
        cover: "https://m.media-amazon.com/images/I/81dQwQlmAXL._AC_UF1000,1000_QL80_.jpg",
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        price: 299
    },
    {
        cover: "https://m.media-amazon.com/images/I/81drfTT9ZfL._AC_UF1000,1000_QL80_.jpg",
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        price: 399
    },
    {
        cover: "https://m.media-amazon.com/images/I/71sBtM3Yi5L._AC_UF1000,1000_QL80_.jpg",
        title: "The Power of Your Subconscious Mind",
        author: "Joseph Murphy",
        price: 250
    },
    {
        cover: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 350
    }
];

// Cart logic using localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderBooks(bookArray) {
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';
    bookArray.forEach((book, idx) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.cover}" alt="${book.title} cover" class="book-cover">
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-price">₹${book.price}</div>
            <button class="buy-btn add-cart-btn" style="background:#ff9800;">Add to Cart</button>
        `;
        card.querySelector('.add-cart-btn').addEventListener('click', () => {
            addToCart(idx);
        });
        booksList.appendChild(card);
    });
}

function filterBooks() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    renderBooks(filtered);
}

document.getElementById('searchBar').addEventListener('input', filterBooks);

function addToCart(idx) {
    let cart = getCart();
    const book = books[idx];
    const found = cart.find(item => item.title === book.title);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ ...book, qty: 1 });
    }
    setCart(cart);
    alert(`Added ${book.title} to cart!`);
}

// Initial render
renderBooks(books);
