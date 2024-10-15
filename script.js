let cart = [];
let totalPrice = 0;

function showSection(section) {
    document.querySelectorAll('main > section').forEach((sec) => {
        sec.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
    if (section === 'cart') {
        displayCart();
    }
}

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;
    alert(`${itemName} added to cart!`);
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<p>${item.name}: $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></p>`;
    });
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    displayCart();
}

function applyDiscount() {
    const discountCode = document.getElementById('discountCode').value;
    let discount = 0;
    if (discountCode === 'CODE10') {
        discount = 0.1;
    } else if (discountCode === 'CODE20') {
        discount = 0.2;
    }
    totalPrice -= totalPrice * discount;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById('orderMessages').innerHTML += `<p>Your order has been placed. Your food will be delivered in 30 minutes.</p>`;
    cart = [];
    totalPrice = 0;
    displayCart();
    showSection('myOrders');
}

function placeOrder(itemName, itemPrice) {
    totalPrice += itemPrice;
    document.getElementById('orderMessages').innerHTML += `<p>Your order for ${itemName} has been placed. Your food will be delivered in 30 minutes.</p>`;
    showSection('myOrders');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    if (message === '') return; // Prevent sending empty messages

    const chatMessages = document.getElementById('chatMessages');
    
    // Add user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerText = `You: ${message}`;
    chatMessages.appendChild(userMessage);

    // Auto-response based on user's message
    let botResponse = '';
    if (message.toLowerCase().includes('order')) {
        botResponse = 'I see you are asking about an order. Your food will be delivered in 30 minutes!';
    } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        botResponse = 'Hello! How can I assist you today?';
    } else if (message.toLowerCase().includes('thank you')) {
        botResponse = 'You’re welcome! Let me know if you need anything else.';
    } else {
        botResponse = 'I’m here to help with any questions regarding your orders!';
    }

    // Add bot's response
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.innerText = `Bot: ${botResponse}`;
    chatMessages.appendChild(botMessage);

    // Clear input field
    chatInput.value = '';

    // Auto-scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// Initial section display
showSection('home');
