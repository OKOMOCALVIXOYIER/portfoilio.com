// Initialize cart as an empty array
let cart = [];

// Get the product buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Add event listeners to the product buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
        updateCart();
    });
});

// Add items to the cart
function addToCart(name, price) {
    cart.push({ name, price });
}

// Update the cart display
function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.name} - Ksh${item.price.toFixed(2)} <button class="remove-from-cart" data-name="${item.name}">Remove</button>`;
        cartDiv.appendChild(cartItem);
        grandTotal += item.price;
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            removeFromCart(name);
            updateCart();
        });
    });
}

// Remove items from the cart
function removeFromCart(name) {
  const itemIndex = cart.findIndex(item => item.name === name);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
}

// Call updateCart() on page load
updateCart();

