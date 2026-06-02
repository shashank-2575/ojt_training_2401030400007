import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Profile = () => {
    const { user, loginUser, logoutUser, showToast } = useContext(AppContext);
    const navigate = useNavigate();

    // Profile Edit state
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameInput, setNameInput] = useState(user.name || '');

    // Addresses state
    const [addresses, setAddresses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form inputs state
    const [addrForm, setAddrForm] = useState({
        name: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });
    const [formError, setFormError] = useState(false);

    // Check auth
    useEffect(() => {
        if (!user.signedIn) {
            navigate('/signin');
        } else {
            setNameInput(user.name);
            const saved = JSON.parse(localStorage.getItem('mb_addresses') || '[]');
            setAddresses(saved);
        }
    }, [user, navigate]);

    const handleSaveName = () => {
        if (nameInput.trim()) {
            loginUser(nameInput.trim(), user.email);
            setIsEditingName(false);
            showToast("Profile name updated!");
        }
    };

    const handleDeleteAddress = (indexToDelete) => {
        const updated = addresses.filter((_, idx) => idx !== indexToDelete);
        setAddresses(updated);
        localStorage.setItem('mb_addresses', JSON.stringify(updated));
        showToast("Address deleted successfully.");
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        if (!addrForm.line1.trim() || !addrForm.city.trim()) {
            setFormError(true);
            return;
        }

        const updated = [...addresses, addrForm];
        setAddresses(updated);
        localStorage.setItem('mb_addresses', JSON.stringify(updated));
        
        // Reset form and close modal
        setAddrForm({
            name: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: '',
            phone: ''
        });
        setFormError(false);
        setIsModalOpen(false);
        showToast("New address added successfully!");
    };

    const handleClearCache = () => {
        if (window.confirm("This will clear your cart, orders, and addresses. Proceed?")) {
            localStorage.clear();
            logoutUser();
            navigate('/signin');
            showToast("All cache cleared.");
        }
    };

    if (!user.signedIn) return null;

    return (
        <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                
                {/* Left Panel: Profile Detail */}
                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', height: 'fit-content' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#002080', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        
                        {isEditingName ? (
                            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                <input 
                                    type="text" 
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }}
                                />
                                <button onClick={handleSaveName} style={{ backgroundColor: '#002080', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
                                <button onClick={() => { setIsEditingName(false); setNameInput(user.name); }} style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>
                                    {user.name} 
                                    <span 
                                        onClick={() => setIsEditingName(true)} 
                                        style={{ fontSize: '14px', color: '#1db5ca', cursor: 'pointer', marginLeft: '8px', fontWeight: 'normal' }}
                                    >
                                        [Edit]
                                    </span>
                                </h3>
                                <p style={{ color: 'gray', marginTop: '4px' }}>{user.email}</p>
                            </div>
                        )}
                    </div>
                    
                    <hr style={{ border: 'none', height: '1px', backgroundColor: '#eee', margin: '20px 0' }} />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button 
                            onClick={() => navigate('/order')} 
                            style={{ width: '100%', padding: '12px', backgroundColor: '#002080', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            My Orders
                        </button>
                        <button 
                            onClick={logoutUser} 
                            style={{ width: '100%', padding: '12px', backgroundColor: '#e63c2e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Sign Out
                        </button>
                        <button 
                            onClick={handleClearCache} 
                            style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Clear Cache & Sign Out
                        </button>
                    </div>
                </div>

                {/* Right Panel: Address Book */}
                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#002080' }}>Shipping Address Book</h3>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            style={{ padding: '10px 16px', backgroundColor: '#1db5ca', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            + Add New Address
                        </button>
                    </div>

                    {addresses.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'gray', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                            No shipping addresses saved yet. Click the button above to add one!
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {addresses.map((addr, idx) => (
                                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', backgroundColor: '#f8fafc', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#1e293b' }}>{addr.name || 'Saved Address'}</h4>
                                        <div style={{ color: '#475569', fontSize: '14px', lineHeight: '1.4' }}>{addr.line1}</div>
                                        {addr.line2 && <div style={{ color: '#475569', fontSize: '14px', lineHeight: '1.4' }}>{addr.line2}</div>}
                                        <div style={{ color: '#475569', fontSize: '14px', lineHeight: '1.4' }}>{addr.city}, {addr.state} - {addr.zip}</div>
                                        {addr.phone && <div style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>Phone: {addr.phone}</div>}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                                        <button 
                                            onClick={() => handleDeleteAddress(idx)}
                                            style={{ backgroundColor: 'transparent', color: '#e63c2e', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
                                        >
                                            Delete Address
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Address Dialog Modal */}
            {isModalOpen && (
                <>
                    <div className="checkout-overlay" onClick={() => setIsModalOpen(false)}></div>
                    <div className="checkout-modal" style={{ width: '500px', display: 'block' }}>
                        <div className="checkout-header">
                            <h3>Add Shipping Address</h3>
                            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSaveAddress}>
                            <div className="checkout-body" style={{ gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Recipient Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                        value={addrForm.name}
                                        onChange={(e) => setAddrForm({...addrForm, name: e.target.value})}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Address Line 1 *</label>
                                    <input 
                                        type="text" 
                                        required
                                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                        value={addrForm.line1}
                                        onChange={(e) => setAddrForm({...addrForm, line1: e.target.value})}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Address Line 2 (Optional)</label>
                                    <input 
                                        type="text" 
                                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                        value={addrForm.line2}
                                        onChange={(e) => setAddrForm({...addrForm, line2: e.target.value})}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>City *</label>
                                        <input 
                                            type="text" 
                                            required
                                            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                            value={addrForm.city}
                                            onChange={(e) => setAddrForm({...addrForm, city: e.target.value})}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>State</label>
                                        <input 
                                            type="text" 
                                            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                            value={addrForm.state}
                                            onChange={(e) => setAddrForm({...addrForm, state: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Zip/Postal Code</label>
                                        <input 
                                            type="text" 
                                            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                            value={addrForm.zip}
                                            onChange={(e) => setAddrForm({...addrForm, zip: e.target.value})}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Phone Number</label>
                                        <input 
                                            type="text" 
                                            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                            value={addrForm.phone}
                                            onChange={(e) => setAddrForm({...addrForm, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                                {formError && (
                                    <div style={{ color: '#e63c2e', fontSize: '13px', fontWeight: 'bold' }}>
                                        Please fill in all required fields (Address Line 1 and City).
                                    </div>
                                )}
                            </div>
                            <div className="checkout-footer">
                                <button type="button" className="cancel-checkout-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="place-order-btn" style={{ backgroundColor: '#1db5ca' }}>Save Address</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
