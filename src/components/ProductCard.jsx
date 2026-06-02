import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { addToCart, defaultProductImg } = useContext(AppContext);

    const renderStars = (ratingVal) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= ratingVal ? '★' : '☆';
        }
        return stars;
    };

    return (
        <div className="box">
            <div className="sub_box">
                <img 
                    src={product.img} 
                    alt={product.name} 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultProductImg;
                    }}
                />
            </div>
            <p align="left">{product.name}</p>
            <div className="price-block">
                <span className="price-now">₹ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                    <span className="price-old">₹ {product.originalPrice.toFixed(2)}</span>
                )}
            </div>
            <div className="rating-block">
                <div className="stars">{renderStars(product.rating)}</div>
                <div className="review-count">(No reviews)</div>
            </div>
            <button className="button1" onClick={() => addToCart(product.id)}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
