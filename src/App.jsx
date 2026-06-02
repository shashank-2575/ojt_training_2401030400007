import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Order from './pages/Order';
import SignIn from './pages/SignIn';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

const AppContent = () => {
    const { toast } = useContext(AppContext);
    const location = useLocation();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Conditionally hide Header and Footer on Sign In page
    const hideHeaderFooter = location.pathname === '/signin';

    return (
        <div className="app-container">
            {/* 1. Global Header */}
            {!hideHeaderFooter && <Header />}

            {/* 2. Page Routing */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order" element={<Order />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>

            {/* 3. Global Footer */}
            {!hideHeaderFooter && <Footer />}

            {/* 4. Global Sliding Cart Drawer */}
            <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

            {/* 5. Global Checkout Modal */}
            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
            />

            {/* 6. Global Floating Toast Notification Banner */}
            <div className={`toast-notification ${toast.visible ? '' : 'hidden'}`}>
                {toast.message}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <AppContent />
            </AppProvider>
        </BrowserRouter>
    );
};

export default App;
