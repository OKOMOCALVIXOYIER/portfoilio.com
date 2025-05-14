document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkout-button');
  const paymentSection = document.getElementById('payment-section');
  const payButton = document.getElementById('pay-button');
  const phoneNumberInput = document.getElementById('phone-number');
  const paymentStatusElement = document.getElementById('payment-status');

  let cart = [];
  function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="cart-item-details">
                ${item.name} - Ksh ${item.price} x ${item.quantity}
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsList.appendChild(listItem);
        total += item.price * item.quantity;
    });
    cartTotalElement.textContent = `Total: Ksh ${total}`;

    // Update remove button event listeners after re-rendering
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
}

function addItemToCart(event) {
    const productDiv = event.target.closest('.product');
    const productId = parseInt(productDiv.dataset.id);
    const productName = productDiv.dataset.name;
    const productPrice = parseInt(productDiv.dataset.price);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCartDisplay();
}

function removeItemFromCart(event) {
    const itemId = parseInt(event.target.dataset.id);
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        addItemToCart(event);
    }
});

checkoutButton.addEventListener('click', () => {
    paymentSection.style.display = 'block';
    checkoutButton.style.display = 'none';
});

payButton.addEventListener('click', () => {
    const phoneNumber = phoneNumberInput.value.trim();
    if (phoneNumber) {
        paymentStatusElement.textContent = 'Initiating M-Pesa payment (requires internet)...';
        // In a real scenario with backend integration,
        // you would send the cart data and phone number to your server here
        // which would then interact with the M-Pesa API.

        // Since this is a frontend-only example, we can only simulate.
        setTimeout(() => {
            const isSuccessful = Math.random() < 0.7; // Simulate success/failure
            if (isSuccessful) {
                paymentStatusElement.textContent = `M-Pesa payment successful for Ksh ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}!`;
                cart = []; // Clear the cart after "payment"
                updateCartDisplay();
                paymentSection.style.display = 'none';
                checkoutButton.style.display = 'block';
                phoneNumberInput.value = '';
            } else {
                paymentStatusElement.textContent = 'M-Pesa payment failed. Please try again.';
            }
        }, 3000); // Simulate network delay
    } else {
        paymentStatusElement.textContent = 'Please enter your M-Pesa phone number.';
    }
});

// Initial cart display
updateCartDisplay();
});
let accountCreated = false; // Flag to track if account creation was successful

function validateAndCreateAccount() {
    const acceptTermsCheckbox = document.getElementById('acceptTerms');
    const termsError = document.getElementById('termsError');
    const createFullNameInput = document.getElementById('createFullName');
    const createEmailInput = document.getElementById('createEmail');
    const createEmailError = document.getElementById('createEmailError');
    const createPasswordInput = document.getElementById('createPassword');
    const createPasswordError = document.getElementById('createPasswordError');
    const createAccountError = document.getElementById('createAccountError');
    const createAccountSuccess = document.getElementById('createAccountSuccess');
    const loginSection = document.getElementById('loginSection');

    let isValid = true;

    if (!acceptTermsCheckbox.checked) {
        termsError.style.display = 'block';
        isValid = false;
    } else {
        termsError.style.display = 'none';
    }

    if (createEmailInput.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createEmailInput.value)) {
        createEmailError.style.display = 'block';
        isValid = false;
    } else {
        createEmailError.style.display = 'none';
    }

    if (createPasswordInput.value.length < 6) {
        createPasswordError.style.display = 'block';
        isValid = false;
    } else {
        createPasswordError.style.display = 'none';
    }

    if (isValid) {
        // In a real scenario, you would send this data to a server for account creation.
        // For this example, we'll simulate success.
        console.log("Creating account with:", {
            fullName: createFullNameInput.value,
            email: createEmailInput.value,
            password: createPasswordInput.value
        });

        // Simulate successful account creation
        createAccountError.style.display = 'none';
        createAccountSuccess.style.display = 'block';
        accountCreated = true;
        loginSection.style.display = 'block'; // Show the login section

        // Optionally clear the create account form
        document.getElementById('createFullName').value = '';
        document.getElementById('createEmail').value = '';
        document.getElementById('createPassword').value = '';

    } else {
        createAccountError.style.display = 'none';
        createAccountSuccess.style.display = 'none';
        loginSection.style.display = 'none'; // Hide login if creation failed
    }
}

function validateAndLogin() {
    const loginEmailInput = document.getElementById('loginEmail');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginPasswordError = document.getElementById('loginPasswordError');
    const loginError = document.getElementById('loginError');
    const loginSuccess = document.getElementById('loginSuccess');

    let isValidLogin = true;

    if (loginEmailInput.value.trim() === '') {
        loginEmailError.style.display = 'block';
        isValidLogin = false;
    } else {
        loginEmailError.style.display = 'none';
    }

    if (loginPasswordInput.value.trim() === '') {
        loginPasswordError.style.display = 'block';
        isValidLogin = false;
    } else {
        loginPasswordError.style.display = 'none';
    }

    if (isValidLogin && accountCreated) {
        // In a real scenario, you would send login credentials to the server for verification.
        // For this example, we'll simulate successful login.
        console.log("Logging in with:", {
            email: loginEmailInput.value,
            password: loginPasswordInput.value
        });

        loginError.style.display = 'none';
        loginSuccess.style.display = 'block';

        // Simulate redirection after successful login
        setTimeout(() => {
            window.location.href = '/dashboard.html'; // Replace with your actual dashboard URL
        }, 1500);
    } else if (!accountCreated) {
        loginError.textContent = "Please create an account first.";
        loginError.style.display = 'block';
        loginSuccess.style.display = 'none';
    } else {
        loginError.textContent = "Invalid login credentials. Please try again.";
        loginError.style.display = 'block';
        loginSuccess.style.display = 'none';
    }
}
const toggleButton = document.querySelector('.toggle-button');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    content.classList.toggle('open');
});