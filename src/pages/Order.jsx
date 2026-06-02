import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const demoOrders = [
    {
        id: 'MB2024001',
        date: '2024-12-10',
        status: 'Delivered',
        total: '₹ 349.00',
        img: 'https://makerbazar.in/cdn/shop/products/319k4kFGDGL.jpg?v=1638777467&width=500',
        name: 'Arduino Uno R3 SMD Board',
        qty: 1
    },
    {
        id: 'MB2024002',
        date: '2025-01-05',
        status: 'Shipped',
        total: '₹ 129.00',
        img: 'https://makerbazar.in/cdn/shop/files/130_Motors_Mix.jpg?v=1744883339&width=800',
        name: '130 DC Motors Mix Pack',
        qty: 2
    }
];

const Order = () => {
    const { user, defaultProductImg } = useContext(AppContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    // Route guard and load orders
    useEffect(() => {
        if (!user.signedIn) {
            navigate('/signin');
            return;
        }

        let savedOrders = localStorage.getItem('mb_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        } else {
            // Load demo orders for signed in user
            localStorage.setItem('mb_orders', JSON.stringify(demoOrders));
            setOrders(demoOrders);
        }
    }, [user, navigate]);

    const getStatusBadgeClass = (status) => {
        const map = { 
            'Delivered': 'badge-delivered', 
            'Shipped': 'badge-shipped', 
            'Processing': 'badge-processing' 
        };
        return `order-badge ${map[status] || 'badge-processing'}`;
    };

    if (!user.signedIn) return null;

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#002080', marginBottom: '20px' }}>
                My Orders
            </h2>
            
            {orders.length === 0 ? (
                <div className="empty-state" style={{ background: 'white', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="#1db5ca" viewBox="0 0 24 24" style={{ marginBottom: '16px', opacity: 0.8 }}>
                        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-14.5-14H1v-2h3l3.6 7.59L6.25 12c-.16.28-.25.61-.25.96C6 14.1 6.9 15 8 15h11v-2H8.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.5 2H5.21l-.42-.84A1 1 0 0 0 3.87 1H1v2h2.13l.37.84z"/>
                    </svg>
                    <h3 style={{ fontSize: '20px', color: '#334155', fontWeight: 'bold', margin: '0 0 8px 0' }}>No orders yet</h3>
                    <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>Looks like you haven't placed any orders. Go explore our store!</p>
                    <Link to="/" style={{ display: 'inline-block', marginTop: '20px', backgroundColor: '#1db5ca', color: 'white', padding: '10px 24px', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 600 }}>
                        Go to Store
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {orders.map(o => (
                        <div className="order-card" key={o.id} style={{ border: '1px solid #e8e8e8', borderRadius: '12px', padding: '20px', background: 'white', display: 'flex', gap: '16px', alignItems: 'flex-start', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <img 
                                src={o.img} 
                                alt={o.name}
                                style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #eee', padding: '4px', flexShrink: 0 }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultProductImg;
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '16px', color: '#1e293b' }}>{o.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                                            Order ID: #{o.id} &nbsp;|&nbsp; Qty: {o.qty}
                                        </div>
                                        <div style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
                                            Ordered: {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#e63c2e' }}>{o.total}</div>
                                        <div style={{ marginTop: '8px' }}>
                                            <span className={getStatusBadgeClass(o.status)}>
                                                {o.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;
