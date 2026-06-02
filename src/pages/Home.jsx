import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Slideshow from '../components/Slideshow';
import CollectionCircles from '../components/CollectionCircles';
import DoubleBoxRow from '../components/DoubleBoxRow';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const { products, searchQuery, categoryFilter } = useContext(AppContext);

    // Filter products globally
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = (categoryFilter === 'all_product' || p.category === categoryFilter);
        return matchesSearch && matchesCategory;
    });

    // Helper to get products in a specific grid container
    const getGridProducts = (gridName) => {
        return filteredProducts.filter(p => p.grid === gridName);
    };

    const gridsConfig = [
        { key: 'clearance', title: 'Clearance Sale' },
        { key: 'motors', title: 'Motors & Robotics' },
        { key: 'controllers', title: 'Microcontrollers & Shields' },
        { key: 'tools', title: 'Tools & Instruments' },
        { key: 'audio', title: 'Audio & Sensors' },
        { key: 'kits', title: 'Kits & Accessories' },
        { key: 'sensors', title: 'Sensors & Modules' },
        { key: 'power', title: 'Batteries & Power Supplies' },
        { key: 'drones', title: 'Drone Parts & Aeromodelling' }
    ];

    return (
        <main>
            {/* Carousel Slideshow */}
            <Slideshow />

            {/* Collection Circles */}
            <CollectionCircles />

            {/* Merged Stacked Double Box Row */}
            <DoubleBoxRow />

            {/* Dynamic Product Grids */}
            {gridsConfig.map(grid => {
                const gridItems = getGridProducts(grid.key);
                if (gridItems.length === 0) return null; // Hide grid + header if no matches found (matches script.js)

                return (
                    <React.Fragment key={grid.key}>
                        <div className="header_box">
                            <span>{grid.title}</span>
                            <span><a href="#" onClick={(e) => e.preventDefault()}>view all</a></span>
                        </div>
                        <div 
                            className="box5" 
                            id={`grid-${grid.key}`}
                            style={{ 
                                backgroundColor: '#f3f5f6', 
                                height: 'auto', 
                                minHeight: '350px', 
                                rowGap: '15px', 
                                paddingBottom: '20px' 
                            }}
                        >
                            {gridItems.map(prod => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </React.Fragment>
                );
            })}
        </main>
    );
};

export default Home;
