import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
    const featuredProducts = [
        // Sample product data
        { id: 1, title: 'Elegant Dress', price: 49.99, image: 'path/to/image1.jpg' },
        { id: 2, title: 'Stylish Handbag', price: 29.99, image: 'path/to/image2.jpg' },
        { id: 3, title: 'Classic Shoes', price: 39.99, image: 'path/to/image3.jpg' },
    ];

    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to Dinas Couture</h1>
                <h2>Featured Products</h2>
                <div className="product-list">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} title={product.title} price={product.price} image={product.image} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;