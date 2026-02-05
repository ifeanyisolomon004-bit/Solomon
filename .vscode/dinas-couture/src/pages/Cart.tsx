import React from 'react';

const Cart: React.FC = () => {
    // Sample cart items, replace with actual state management
    const cartItems = [
        { id: 1, name: 'Dress', price: 49.99, quantity: 1 },
        { id: 2, name: 'Shoes', price: 89.99, quantity: 2 },
    ];

    const handleQuantityChange = (id: number, quantity: number) => {
        // Logic to update quantity
    };

    const handleRemoveItem = (id: number) => {
        // Logic to remove item from cart
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                min="1"
                            />
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h2>Total: ${calculateTotal()}</h2>
            <button>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;