import React from 'react';

const Product: React.FC = () => {
    // Sample product data
    const product = {
        id: 1,
        title: 'Elegant Dress',
        description: 'A beautiful and elegant dress perfect for any occasion.',
        price: 99.99,
        images: [
            'image1.jpg',
            'image2.jpg',
            'image3.jpg'
        ]
    };

    return (
        <div className="product">
            <h1>{product.title}</h1>
            <div className="product-images">
                {product.images.map((image, index) => (
                    <img key={index} src={image} alt={product.title} />
                ))}
            </div>
            <p>{product.description}</p>
            <h2>${product.price.toFixed(2)}</h2>
            <button>Add to Cart</button>
        </div>
    );
};

export default Product;