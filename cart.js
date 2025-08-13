function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    let cart = getCart();
    cartList.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }
    cart.forEach((item, idx) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.cover}" alt="${item.title} cover">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">by ${item.author}</div>
                <div class="cart-item-price">₹${item.price} x 
                    <button class="qty-btn" data-action="decrease">-</button>
                    <span class="cart-qty">${item.qty}</span>
                    <button class="qty-btn" data-action="increase">+</button>
                    = <span class="cart-subtotal">₹${subtotal}</span>
                </div>
            </div>
            <button class="remove-btn">Remove</button>
        `;
        // Quantity controls
        div.querySelector('[data-action="decrease"]').addEventListener('click', () => updateQty(idx, -1));
        div.querySelector('[data-action="increase"]').addEventListener('click', () => updateQty(idx, 1));
        // Remove button
        div.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(idx));
        cartList.appendChild(div);
    });
    cartTotal.innerHTML = `Total: ₹${total}`;
    // Add clear cart and checkout buttons
    cartTotal.innerHTML += `<div style="margin-top:1rem;display:flex;gap:1rem;justify-content:center;">
        <button id="clearCartBtn" class="buy-btn" style="background:#e74c3c;">Clear Cart</button>
        <button id="checkoutBtn" class="buy-btn">Checkout</button>
    </div>`;
    document.getElementById('clearCartBtn').onclick = clearCart;
    document.getElementById('checkoutBtn').onclick = showCheckoutModal;
}


function removeFromCart(idx) {
    let cart = getCart();
    cart.splice(idx, 1);
    setCart(cart);
    renderCart();
}

function updateQty(idx, change) {
    let cart = getCart();
    cart[idx].qty += change;
    if (cart[idx].qty < 1) cart[idx].qty = 1;
    setCart(cart);
    renderCart();
}

function clearCart() {
    setCart([]);
    renderCart();
}


function showCheckoutModal() {
    let cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    document.getElementById('checkoutModal').style.display = 'block';
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
    document.getElementById('checkoutMsg').textContent = '';
    document.getElementById('checkoutForm').reset();
}

window.addEventListener('DOMContentLoaded', () => {
    renderCart();
    // Modal close button
    document.getElementById('closeModalBtn').onclick = closeCheckoutModal;
    // Modal form submit
    document.getElementById('checkoutForm').onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('checkoutName').value.trim();
        const email = document.getElementById('checkoutEmail').value.trim();
        const address = document.getElementById('checkoutAddress').value.trim();
        if (!name || !email || !address) {
            document.getElementById('checkoutMsg').textContent = 'Please fill all details.';
            return;
        }
        document.getElementById('checkoutMsg').textContent = `Thank you, ${name}! Your order has been placed.`;
        setTimeout(() => {
            closeCheckoutModal();
            clearCart();
        }, 2000);
    };
    // Close modal on outside click
    window.onclick = function(event) {
        const modal = document.getElementById('checkoutModal');
        if (event.target === modal) {
            closeCheckoutModal();
        }
    };
});

window.addEventListener('DOMContentLoaded', renderCart);
