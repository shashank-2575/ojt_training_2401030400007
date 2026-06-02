import React, { createContext, useState, useEffect } from 'react';
import { products, defaultProductImg } from '../data/products';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // 1. Cart State
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('mb_cart_items');
        return saved ? JSON.parse(saved) : [];
    });
    const [appliedPromoDiscount, setAppliedPromoDiscount] = useState(0);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

    // 2. Auth State
    const [user, setUser] = useState(() => {
        const signedIn = localStorage.getItem('mb_signed_in');
        const name = localStorage.getItem('mb_name');
        const email = localStorage.getItem('mb_email');
        if (signedIn === '1' && name) {
            return { signedIn: true, name, email };
        }
        return { signedIn: false, name: '', email: '' };
    });

    // 3. Search & Category Filters State
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all_product');

    // 4. Global Toast Notification State
    const [toast, setToast] = useState({ visible: false, message: '' });

    // Sync Cart to LocalStorage on changes
    useEffect(() => {
        localStorage.setItem('mb_cart_items', JSON.stringify(cart));
    }, [cart]);

    const showToast = (message) => {
        setToast({ visible: true, message });
        setTimeout(() => {
            setToast({ visible: false, message: '' });
        }, 3000);
    };

    // Cart Management Actions
    const addToCart = (productId) => {
        const prod = products.find(p => p.id === productId);
        if (!prod) return;

        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
                showToast(`Incremented "${prod.name}" quantity in cart!`);
                return prev.map(item => 
                    item.id === productId ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                showToast(`Added "${prod.name}" to cart!`);
                return [...prev, {
                    id: prod.id,
                    name: prod.name,
                    price: prod.price,
                    img: prod.img,
                    qty: 1
                }];
            }
        });
    };

    const addCustomProductToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                showToast(`Incremented "${item.name}" quantity in cart!`);
                return prev.map(i => 
                    i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                );
            } else {
                showToast(`Added "${item.name}" to cart!`);
                return [...prev, {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    img: item.img || defaultProductImg,
                    qty: 1
                }];
            }
        });
    };

    const changeQty = (productId, delta) => {
        setCart(prev => {
            const item = prev.find(i => i.id === productId);
            if (!item) return prev;

            const newQty = item.qty + delta;
            if (newQty <= 0) {
                showToast(`Removed "${item.name}" from cart.`);
                return prev.filter(i => i.id !== productId);
            } else {
                return prev.map(i => 
                    i.id === productId ? { ...i, qty: newQty } : i
                );
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const item = prev.find(i => i.id === productId);
            if (item) {
                showToast(`Removed "${item.name}" from cart.`);
            }
            return prev.filter(i => i.id !== productId);
        });
    };

    const clearCart = () => {
        setCart([]);
        setAppliedPromoDiscount(0);
    };

    // Auth Actions
    const loginUser = (name, email) => {
        localStorage.setItem('mb_signed_in', '1');
        localStorage.setItem('mb_name', name);
        localStorage.setItem('mb_email', email);
        setUser({ signedIn: true, name, email });
        showToast(`Welcome back, ${name.split(' ')[0]}!`);
    };

    const logoutUser = () => {
        localStorage.removeItem('mb_signed_in');
        localStorage.removeItem('mb_name');
        localStorage.removeItem('mb_email');
        setUser({ signedIn: false, name: '', email: '' });
        showToast("Signed out successfully.");
    };

    const updateSearch = (query) => {
        setSearchQuery(query);
    };

    const updateCategory = (category) => {
        setCategoryFilter(category);
    };

    return (
        <AppContext.Provider value={{
            products,
            defaultProductImg,
            cart,
            appliedPromoDiscount,
            setAppliedPromoDiscount,
            user,
            searchQuery,
            categoryFilter,
            toast,
            showToast,
            addToCart,
            addCustomProductToCart,
            changeQty,
            removeFromCart,
            clearCart,
            loginUser,
            logoutUser,
            updateSearch,
            updateCategory,
            cartDrawerOpen,
            setCartDrawerOpen
        }}>
            {children}
        </AppContext.Provider>
    );
};
