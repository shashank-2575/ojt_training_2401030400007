import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const collections = [
    {
        name: "RC Planes & Drone",
        bg: "https://makerbazar.in/cdn/shop/collections/Makerware_Collection_Bullet_-_Aeromodelling-02-02.png?v=1573633272&width=480",
        category: "robotics"
    },
    {
        name: "Art and Craft",
        bg: "https://makerbazar.in/cdn/shop/collections/Arts_Crafts_Collection.jpg?v=1573640701&width=480",
        category: "all_product"
    },
    {
        name: "3D printing",
        bg: "https://makerbazar.in/cdn/shop/collections/3d_printer.jpg?v=1573633327&width=480",
        category: "all_product"
    },
    {
        name: "Stem learning Toys",
        bg: "https://makerbazar.in/cdn/shop/collections/makerware_elements_new-02_1.png?v=1578559073&width=240",
        category: "robotics"
    },
    {
        name: "Sensor",
        bg: "https://makerbazar.in/cdn/shop/collections/IOt_sensors.jpg?v=1573633211&width=480",
        category: "electronics"
    },
    {
        name: "Hardware",
        bg: "https://makerbazar.in/cdn/shop/collections/Makerware_Collection_Bullet_-_Wood_Working-02-02-02_1.jpg?v=1573640654&width=480",
        category: "hardware"
    }
];

const CollectionCircles = () => {
    const { updateCategory } = useContext(AppContext);

    const handleClick = (category) => {
        updateCategory(category);
        const grid = document.getElementById('grid-clearance');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="collection" style={{ height: '500px', backgroundColor: '#f3f5f6' }}>
            <div className="circle_header">
                <span>Our Collection</span>
                <span style={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => handleClick('all_product')}>
                    View all
                </span>
            </div>
            <div className="circle_hover">
                {collections.map((col, idx) => (
                    <div key={idx} onClick={() => handleClick(col.category)}>
                        <div 
                            className="circle" 
                            style={{ backgroundImage: `url(${col.bg})` }}
                        ></div>
                        <br />
                        <div className="para">
                            <span>{col.name}</span>
                            <span className="arrow">→</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionCircles;
