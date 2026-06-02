import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const CartDrawer = ({ onOpenCheckout }) => {
    const { 
        cart, 
        changeQty, 
        removeFromCart, 
        appliedPromoDiscount, 
        setAppliedPromoDiscount,
        cartDrawerOpen,
        setCartDrawerOpen,
        defaultProductImg
    } = useContext(AppContext);

    const [promoInput, setPromoInput] = useState('');
    const [promoMsg, setPromoMsg] = useState({ text: '', color: '' });

    // Always render to allow CSS slide transitions

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;
    const discountVal = subtotal * (appliedPromoDiscount / 100);
    const finalTotal = subtotal - discountVal + shipping;

    const handleApplyPromo = () => {
        const code = promoInput.trim().toUpperCase();
        if (code === 'MAKER10') {
            setAppliedPromoDiscount(10);
            setPromoMsg({ text: '10% discount applied successfully!', color: 'green' });
        } else if (code === '') {
            setAppliedPromoDiscount(0);
            setPromoMsg({ text: '', color: '' });
        } else {
            setAppliedPromoDiscount(0);
            setPromoMsg({ text: 'Invalid promo code.', color: 'red' });
        }
    };

    const handleCheckoutClick = () => {
        if (cart.length === 0) {
            alert("Cart is empty! Add products first.");
            return;
        }
        setCartDrawerOpen(false);
        onOpenCheckout();
    };

    return (
        <>
            <div className={`cart-overlay ${cartDrawerOpen ? '' : 'hidden'}`} onClick={() => setCartDrawerOpen(false)}></div>
            <div className={`cart-drawer ${cartDrawerOpen ? '' : 'hidden'}`}>
                <div className="cart-header">
                    <h3>Shopping Cart ({cart.reduce((sum, i) => sum + i.qty, 0)})</h3>
                    <button className="close-drawer" onClick={() => setCartDrawerOpen(false)}>&times;</button>
                </div>
                
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart-msg">Your shopping cart is empty!</div>
                    ) : (
                        cart.map(item => (
                            <div className="cart-item" key={item.id}>
                                <img 
                                    src={item.img} 
                                    alt={item.name} 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = defaultProductImg;
                                    }}
                                />
                                <div className="cart-item-info">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price">₹ {item.price.toFixed(2)}</div>
                                    <div className="cart-item-qty">
                                        <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>-</button>
                                        <span className="qty-val">{item.qty}</span>
                                        <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)} title="Remove Item">✕</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span className="price-val">₹ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>{shipping === 0 ? 'FREE' : `₹ ${shipping.toFixed(2)}`}</span>
                    </div>
                    {discountVal > 0 && (
                        <div className="summary-row" style={{ color: 'green', fontWeight: 'bold' }}>
                            <span>Promo Discount (10%):</span>
                            <span>- ₹ {discountVal.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="summary-row total-row">
                        <span>Total:</span>
                        <span className="price-val">₹ {finalTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="promo-code-container">
                        <input 
                            type="text" 
                            placeholder="Promo code (e.g. MAKER10)" 
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                        />
                        <button onClick={handleApplyPromo}>Apply</button>
                    </div>
                    {promoMsg.text && (
                        <div className="promo-msg" style={{ color: promoMsg.color }}>
                            {promoMsg.text}
                        </div>
                    )}
                    
                    <button className="checkout-drawer-btn" onClick={handleCheckoutClick}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
