import React from 'react';

const Checkout: React.FC = () => {
    return (
        <div>
            <h1>Checkout</h1>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" required />
                </div>
                <div>
                    <label htmlFor="payment">Payment Method:</label>
                    <select id="payment" name="payment" required>
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                <button type="submit">Complete Purchase</button>
            </form>
        </div>
    );
};

export default Checkout;