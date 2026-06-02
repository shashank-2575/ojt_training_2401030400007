import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CheckoutModal = ({ isOpen, onClose }) => {
    const { 
        cart, 
        clearCart, 
        user, 
        appliedPromoDiscount, 
        showToast 
    } = useContext(AppContext);

    const navigate = useNavigate();

    // Local States for Checkout
    const [addresses, setAddresses] = useState([]);
    const [selectedAddrIndex, setSelectedAddrIndex] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Prepaid'); // Prepaid or COD

    // Load addresses from LocalStorage on mount/open
    useEffect(() => {
        if (isOpen) {
            const saved = JSON.parse(localStorage.getItem('mb_addresses') || '[]');
            setAddresses(saved);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Recalculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = subtotal > 999 ? 0 : 49;
    const discountVal = subtotal * (appliedPromoDiscount / 100);
    const codCharge = paymentMethod === 'COD' ? 50 : 0;
    const total = subtotal - discountVal + shipping + codCharge;

    const handlePlaceOrder = () => {
        // 1. Session Check
        if (!user.signedIn) {
            showToast("Please sign in to place an order.");
            onClose();
            navigate('/signin');
            return;
        }

        // 2. Address Check
        if (addresses.length === 0) {
            showToast("Please add and select a delivery address.");
            return;
        }

        const selectedAddress = addresses[selectedAddrIndex];
        const firstItem = cart[0];
        const orderName = firstItem.name + (cart.length > 1 ? ` + ${cart.length - 1} more items` : '');
        const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

        const newOrder = {
            id: 'MB' + Math.floor(100000 + Math.random() * 900000), // Random 6 digit order ID
            date: new Date().toISOString().split('T')[0],
            status: 'Processing',
            total: `₹ ${total.toFixed(2)}`,
            img: firstItem.img,
            name: orderName,
            qty: totalQty
        };

        // 3. Save order to LocalStorage
        const orders = JSON.parse(localStorage.getItem('mb_orders') || '[]');
        orders.unshift(newOrder); // Add to top
        localStorage.setItem('mb_orders', JSON.stringify(orders));

        // 4. Clear cart and finish
        clearCart();
        onClose();
        showToast("Order placed successfully! Redirecting to Orders...");
        
        setTimeout(() => {
            navigate('/order');
        }, 1500);
    };

    return (
        <>
            <div className="checkout-overlay" onClick={onClose}></div>
            <div className="checkout-modal">
                <div className="checkout-header">
                    <h3>Checkout</h3>
                    <button className="close-modal-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="checkout-body">
                    {/* Section 1: Address */}
                    <div className="checkout-section">
                        <h4>1. Delivery Address</h4>
                        {addresses.length === 0 ? (
                            <div className="no-address-alert">
                                No addresses found. <Link to="/profile" onClick={onClose}>Add address in your profile</Link>.
                            </div>
                        ) : (
                            <div className="checkout-address-list">
                                {addresses.map((addr, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`checkout-address-card ${selectedAddrIndex === idx ? 'selected' : ''}`}
                                        onClick={() => setSelectedAddrIndex(idx)}
                                    >
                                        <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                                            <input 
                                                type="radio" 
                                                name="checkoutAddressRadio" 
                                                checked={selectedAddrIndex === idx}
                                                onChange={() => setSelectedAddrIndex(idx)}
                                                style={{ marginRight: '10px', marginTop: '4px' }}
                                            />
                                            <div>
                                                <strong>{addr.name || 'Saved Address'}</strong>
                                                <div>{addr.line1}{addr.line2 ? ', ' + addr.line2 : ''}</div>
                                                <div>{addr.city}, {addr.state} - {addr.zip}</div>
                                                {addr.phone && (
                                                    <div style={{ color: 'gray', fontSize: '12px', marginTop: '4px' }}>
                                                        Phone: {addr.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Section 2: Payment */}
                    <div className="checkout-section">
                        <h4>2. Payment Method</h4>
                        <div className="payment-options">
                            <label className="payment-option">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="Prepaid" 
                                    checked={paymentMethod === 'Prepaid'}
                                    onChange={() => setPaymentMethod('Prepaid')}
                                    style={{ marginTop: '4px' }}
                                />
                                <div className="option-details">
                                    <strong>UPI / Net Banking / Cards (Prepaid)</strong>
                                    <span>Get free delivery above ₹999!</span>
                                </div>
                            </label>
                            <label className="payment-option">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="COD" 
                                    checked={paymentMethod === 'COD'}
                                    onChange={() => setPaymentMethod('COD')}
                                    style={{ marginTop: '4px' }}
                                />
                                <div className="option-details">
                                    <strong>Cash on Delivery (COD)</strong>
                                    <span>Additional ₹50 COD handling charges apply.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Section 3: Summary */}
                    <div className="checkout-section summary-box">
                        <h4>Order Summary</h4>
                        <div className="summary-details">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Subtotal ({cart.reduce((sum, i) => sum + i.qty, 0)} items):</span>
                                <span>₹ {subtotal.toFixed(2)}</span>
                            </div>
                            {discountVal > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'green', fontWeight: 600 }}>
                                    <span>Discount (10%):</span>
                                    <span>- ₹ {discountVal.toFixed(2)}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Shipping Charges:</span>
                                <span>{shipping === 0 ? 'FREE' : `₹ ${shipping.toFixed(2)}`}</span>
                            </div>
                            {codCharge > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'orange' }}>
                                    <span>COD Handling Fee:</span>
                                    <span>₹ {codCharge.toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="checkout-footer">
                    <button className="cancel-checkout-btn" onClick={onClose}>Cancel</button>
                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order (₹{total.toFixed(2)})
                    </button>
                </div>
            </div>
        </>
    );
};

export default CheckoutModal;
