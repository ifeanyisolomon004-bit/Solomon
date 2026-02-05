// This file manages the shopping cart functionality, including adding items, removing items, and updating the cart display.

const cart = [];

// Function to add an item to the cart
function addItemToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeItemFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartDisplay();
    }
}

// Function to update the cart display
function updateCartDisplay() {
    const cartDisplay = document.getElementById('cart-display');
    cartDisplay.innerHTML = ''; // Clear current display

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price}`;
        cartDisplay.appendChild(itemElement);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: $${total}`;
    cartDisplay.appendChild(totalElement);
}

// Example usage
// addItemToCart({ id: 1, name: 'Dress', price: 49.99 });
// removeItemFromCart(1);