import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {
    const { 
        cart, 
        user, 
        searchQuery, 
        updateSearch, 
        categoryFilter, 
        updateCategory, 
        setCartDrawerOpen 
    } = useContext(AppContext);

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState(searchQuery);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        updateSearch(searchInput);
        // If we are not on home, redirect to home to display filtered products
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        let mapped = 'all_product';
        if (val === 'AC motor' || val === 'DC motor' || val === 'DC fan') {
            mapped = 'robotics';
        } else if (val === 'litium ion battery' || val === 'coin button cell') {
            mapped = 'electronics';
        }
        updateCategory(mapped);
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleSubNavChange = (e) => {
        const categoryMap = {
            'Electronic Components': 'electronics',
            'audio': 'electronics',
            'sensor': 'electronics',
            'Micro_controller': 'electronics',
            'Board_and_shield': 'electronics',
            'Robotics': 'robotics',
            'prototype': 'prototype',
            'Hardware': 'hardware',
            'Home & Decore': 'home-decor',
            'all_product': 'all_product'
        };
        const mapped = categoryMap[e.target.value] || 'all_product';
        updateCategory(mapped);
        e.target.selectedIndex = 0; // reset
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    };

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <header>
            <div>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', color: 'white', height: '45px' }}>
                    ✨Now get free delivery on prepaid orders above Rs 999/-
                </p>
            </div>
            
            <div className="navigation">
                {/* Header Menu details */}
                <details className="menu-panel">
                    <summary className="menu-toggle" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </summary>
                    <div className="menu-table-wrap">
                        <table className="menu-table">
                            <thead>
                                <tr>
                                    <th>Electronics</th>
                                    <th>Robotics</th>
                                    <th>Prototype</th>
                                    <th>Brand</th>
                                    <th>Hardware</th>
                                    <th>RC plane & Drone</th>
                                    <th>Art & Craft</th>
                                    <th>Home & Decore</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Electronic Components</td>
                                    <td onClick={() => { updateCategory('robotics'); navigate('/'); }}>Electronic Components</td>
                                    <td onClick={() => { updateCategory('prototype'); navigate('/'); }}>Electronic Components</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Electronic Components</td>
                                    <td onClick={() => { updateCategory('hardware'); navigate('/'); }}>Electronic Components</td>
                                    <td onClick={() => { updateCategory('robotics'); navigate('/'); }}>Electronic Components</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>Electronic Components</td>
                                    <td onClick={() => { updateCategory('home-decor'); navigate('/'); }}>Electronic Components</td>
                                </tr>
                                <tr>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>audio</td>
                                </tr>
                                <tr>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>sensor</td>
                                </tr>
                                <tr>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Micro_controller</td>
                                </tr>
                                <tr>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                    <td onClick={() => { updateCategory('electronics'); navigate('/'); }}>Board_and_shield</td>
                                </tr>
                                <tr>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                    <td onClick={() => { updateCategory('all_product'); navigate('/'); }}>all_product</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>

                <div className="maker">
                    <h1>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <span style={{ color: 'red', marginLeft: '-5px' }}>m</span>
                            <span style={{ color: 'rgb(22, 113, 187)', marginLeft: '-5px', opacity: 0.7 }}>a</span>
                            <span style={{ color: 'rgb(255, 208, 0)', marginLeft: '-5px', opacity: 0.7 }}>k</span>
                            <span style={{ color: 'rgb(12, 235, 31)', marginLeft: '-5px', opacity: 0.7 }}>e</span>
                            <span style={{ color: 'rgb(228, 59, 110)', marginLeft: '-5px', opacity: 0.7 }}>r</span>
                            <span style={{ color: '#002080' }}>bazar</span>
                        </Link>
                    </h1>
                </div>

                <div className="dropdown">
                    <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
                        <input 
                            type="text" 
                            className="search" 
                            placeholder="  search" 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <select 
                            name="All categories" 
                            style={{ fontSize: '16px' }} 
                            className="catagories"
                            onChange={handleCategoryChange}
                        >
                            <option value="All catagories">All categories</option>
                            <option value="AC motor">AC motors</option>
                            <option value="monitor">monitor</option>
                            <option value="coin button cell">coin button cell</option>
                            <option value="litium ion battery">litium ion battery</option>
                            <option value="DC fan">DC fan</option>
                        </select>
                        <button type="submit" className="button">
                            <span className="material-symbols-outlined" style={{ color: 'white' }}>search</span>
                        </button>
                    </form>
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ borderRight: '2px solid rgb(51, 48, 48)', paddingRight: '40px' }}>
                        {user.signedIn ? (
                            <Link to="/profile" id="login">Hello, {user.name.split(' ')[0]}</Link>
                        ) : (
                            <Link to="/signin" id="login">Login/SignUp</Link>
                        )}
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '4px' }}>
                            <span style={{ fontWeight: 'bold', color: '#002080', cursor: 'pointer', fontSize: '13px' }} onClick={() => navigate('/profile')}>
                                My Account
                            </span>
                            <span style={{ color: '#555' }}>|</span>
                            <span style={{ fontWeight: 'bold', color: '#002080', cursor: 'pointer', fontSize: '13px' }} onClick={() => navigate('/order')}>
                                My Orders
                            </span>
                        </div>
                    </div>

                    <div className="cart" style={{ cursor: 'pointer' }} onClick={() => setCartDrawerOpen(true)}>
                        <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </button>
                        <p>Cart ({totalQty})</p>
                    </div>
                </div>
            </div>

            <section className="selector">
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>Electronics</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>Robotics</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>prototype</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>Brand</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>Hardware</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>RC plane & Drone</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>Art & Craft</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
                <select name="items" onChange={handleSubNavChange}>
                    <option value="" disabled selected hidden>Home & Decore</option>
                    <option value="Electronic Components">Electronic Components</option>
                    <option value="audio">audio</option>
                    <option value="sensor">sensor</option>
                    <option value="Micro_controller">Micro_controller</option>
                    <option value="Board_and_shield">Board_and_shield</option>
                    <option value="all_product">all_product</option>
                </select>
            </section>
        </header>
    );
};

export default Header;
