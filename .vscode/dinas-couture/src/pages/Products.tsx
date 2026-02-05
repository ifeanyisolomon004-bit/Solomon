import React from 'react';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
    const products = [
        // Sample product data
        { id: 1, title: 'Dress', price: 49.99, image: 'dress.jpg' },
        { id: 2, title: 'Shirt', price: 29.99, image: 'shirt.jpg' },
        { id: 3, title: 'Pants', price: 39.99, image: 'pants.jpg' },
    ];

    return (
        <div>
            <h1>Our Products</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;