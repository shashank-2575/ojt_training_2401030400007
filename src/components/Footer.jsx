import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Footer = () => {
    const { showToast } = useContext(AppContext);
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            showToast("Subscribed successfully! Thank you.");
            setEmail('');
        } else {
            showToast("Please enter a valid email address.");
        }
    };

    return (
        <div className="footer" style={{ marginTop: '40px' }}>
            <footer>
                <div style={{ display: 'flex', textDecoration: 'none' }}>
                    <div style={{ lineHeight: '2' }}>
                        <span>About the shop</span>
                        <p>
                            <strong>MakerBazar</strong>.in best online store to buy STEM Kits,<br />
                            Electronics, Robotics, Aeromodelling Drone Parts, IoT,<br />
                            Prototyping and Arts & Crafts Materials at low price.
                        </p>
                    </div>
                    <div>
                        <span>Popular collection</span>
                        <ul style={{ color: 'white', lineHeight: '2', listStyle: 'none' }}>
                            <li>Latest Product</li>
                            <li>Micro Controllers</li>
                            <li>IoT sensor</li>
                            <li>STEM kit</li>
                            <li>Aeromodelling</li>
                            <li>Art & Craft</li>
                        </ul>
                    </div>

                    <div>
                        <span>Information</span>
                        <ul style={{ color: 'white', lineHeight: '2', listStyle: 'none' }}>
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>FAQs</li>
                            <li>privacy policy</li>
                            <li>Term and service</li>
                            <li>Refund Policy</li>
                            <li>Shipping Policy</li>
                            <li>Blogs</li>
                        </ul>
                    </div>
                    
                    <div style={{ lineHeight: '2' }}>
                        <span>Subscribe to Our Newsletter</span>
                        <p>Join us for quick new updates and <br />offers...</p>
                        <br />
                        <form onSubmit={handleSubscribe} style={{ paddingBottom: '20px' }}>
                            <input 
                                type="email" 
                                placeholder="Your email"
                                style={{ border: 'none', height: '45px', fontSize: '20px', paddingLeft: '10px' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br /><br />
                            <button 
                                type="submit"
                                style={{ border: 'none', backgroundColor: 'rgb(246, 167, 4)', color: 'white', height: '45px', width: '140px', fontSize: '18px', cursor: 'pointer' }}
                            >
                                subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <br /><br />
                <div style={{ display: 'flex', gap: '1000px' }}>
                    <span>© 2026 MakerBazar.in</span>
                    <span>Follow Us</span>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
