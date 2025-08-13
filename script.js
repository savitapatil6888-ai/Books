
// Book data
const books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 499,
        cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 399,
        cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg"
    },
    {
        title: "1984",
        author: "George Orwell",
        price: 349,
        cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 429,
        cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 599,
        cover: "https://covers.openlibrary.org/b/id/6979861-L.jpg"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 299,
        cover: "https://covers.openlibrary.org/b/id/8235116-L.jpg"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350,
        cover: "https://covers.openlibrary.org/b/id/8155436-L.jpg"
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 499,
        cover: "https://covers.openlibrary.org/b/id/7884866-L.jpg"
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        price: 899,
        cover: "https://covers.openlibrary.org/b/id/8231852-L.jpg"
    },
    {
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        price: 299,
        cover: "https://covers.openlibrary.org/b/id/8228692-L.jpg"
    },
    {
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        price: 399,
        cover: "https://covers.openlibrary.org/b/id/8155437-L.jpg"
    },
    {
        title: "The Power of Your Subconscious Mind",
        author: "Joseph Murphy",
        price: 250,
        cover: "https://covers.openlibrary.org/b/id/8155438-L.jpg"
    },
    {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 350,
        cover: "https://covers.openlibrary.org/b/id/8155439-L.jpg"
    }
]

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        showPage(page);
        window.location.hash = page;
    });
});

window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#','') || 'home';
    showPage(hash);
});
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#','') || 'home';
    showPage(hash);
});

// Books rendering
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
            <div class="book-price">$${book.price.toFixed(2)}</div>
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

const searchBar = document.getElementById('searchBar');
if (searchBar) {
    searchBar.addEventListener('input', filterBooks);
}

// Cart functionality
function addToCart(idx) {
    const book = books[idx];
    const found = cart.find(item => item.title === book.title);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ ...book, qty: 1 });
    }
    renderCart();
    showPage('cart');
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    cartList.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.cover}" alt="${item.title} cover">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">by ${item.author}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.qty}</div>
            </div>
            <button class="remove-btn">Remove</button>
        `;
        div.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(idx));
        cartList.appendChild(div);
    });
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('contactMsg').textContent = 'Thank you for contacting us! We will get back to you soon.';
        contactForm.reset();
    });
}
