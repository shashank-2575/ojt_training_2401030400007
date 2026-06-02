import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DoubleBoxRow = () => {
    const { addCustomProductToCart } = useContext(AppContext);

    return (
        <div style={{ margin: '30px auto', maxWidth: '1800px' }}>
            {/* Double Row 1: Product Grid (Tall, Split, Tall, Split) */}
            <div className="double" style={{ marginBottom: 0 }}>
                {/* Column 1: JST XHB Connectors (Tall) */}
                <div className="double_box1"
                    onClick={() => addCustomProductToCart({ id: 'DP1', name: 'JST XHB 2.54mm Housing Connectors (with Lock)', price: 13.00, img: '' })}>
                    <div className="double-img-placeholder vertical-img"></div>
                    <div className="double-title">JST XHB 2.54mm Housing Connectors (with Lock)</div>
                    <div className="double-price-block">
                        <span className="double-price-now">From ₹ 13.00</span>
                        <span className="double-price-extra">₹ 0.84 each</span>
                    </div>
                    <div className="double-stars">☆☆☆☆☆ (No reviews)</div>
                    <button className="double-btn">Add to Cart</button>
                </div>
                
                {/* Column 2: AS5600 & Taparia Pliers (Split) */}
                <div className="double_box2">
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP2', name: 'AS5600 Magnetic Encoder Sensor Module', price: 149.00, img: '' })}>
                        <div className="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">AS5600 Magnetic Encoder Sensor Module</div>
                            <div className="double-price-block">
                                <span className="double-price-now">₹ 149.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP3', name: 'Taparia: Mini Pliers Two Color Dip-Coated Sleeve', price: 192.00, img: '' })}>
                        <span className="double-tag">Save ₹ 11.00</span>
                        <div class="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">Taparia: Mini Pliers Two Color Sleeve</div>
                            <div className="double-price-block">
                                <span className="double-price-now">₹ 192.00</span>
                                <span className="double-price-old">₹ 205.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                </div>

                {/* Column 3: BOPP Packaging Tape (Tall) */}
                <div className="double_box1"
                    onClick={() => addCustomProductToCart({ id: 'DP4', name: 'Generic: BOPP Packaging Tape Roll', price: 45.00, img: '' })}>
                    <div className="double-img-placeholder vertical-img"></div>
                    <div className="double-title">Generic: BOPP Packaging Tape Roll</div>
                    <div className="double-price-block">
                        <span className="double-price-now">₹ 45.00</span>
                    </div>
                    <div className="double-stars">☆☆☆☆☆ (No reviews)</div>
                    <button class="double-btn">Add to Cart</button>
                </div>

                {/* Column 4: Fixwell Gel & Hongyan Encoder (Split) */}
                <div className="double_box2">
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP5', name: 'Fixwell Ultra High Viscosity Gel Glue', price: 69.00, img: '' })}>
                        <span className="double-tag">Save ₹ 11.00</span>
                        <div className="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">Fixwell Adhesive Gel Glue</div>
                            <div className="double-price-block">
                                <span className="double-price-now">₹ 69.00</span>
                                <span className="double-price-old">₹ 80.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP6', name: 'Hongyan Hollow Shaft Incremental Encoder Series', price: 49.00, img: '' })}>
                        <div className="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">Hongyan Hollow Shaft Encoder Series</div>
                            <div className="double-price-block">
                                <span class="double-price-now">From ₹ 49.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Double Row 2: Product Grid (Split, Tall, Split, Tall) - Upside Down / Inverted Layout */}
            <div className="double" style={{ marginTop: 0 }}>
                {/* Column 1: 3M Masks & Aero Plane STEM Kit (Split) */}
                <div className="double_box2">
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP7', name: '3M Disposable Respirator Masks', price: 25.00, img: '' })}>
                        <span className="double-tag">Save ₹ 4.00</span>
                        <div className="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">3M Disposable Respirator Masks</div>
                            <div className="double-price-block">
                                <span className="double-price-now">₹ 25.00</span>
                                <span className="double-price-old">₹ 29.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP8', name: 'DIY Wooden Double-Wing Aero Plane STEM Model Kit', price: 149.00, img: '' })}>
                        <div className="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">DIY Wooden Aero Plane STEM Model Kit</div>
                            <div className="double-price-block">
                                <span className="double-price-now">₹ 149.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Yellow Heat Shrink Sleeve (Tall) */}
                <div className="double_box1"
                    onClick={() => addCustomProductToCart({ id: 'DP9', name: 'Yellow Heat Shrink Sleeve Tube For Wire Protection', price: 13.00, img: '' })}>
                    <div className="double-img-placeholder vertical-img"></div>
                    <div className="double-title">Yellow Heat Shrink Tube For Wire Protection</div>
                    <div className="double-price-block">
                        <span className="double-price-now">From ₹ 13.00</span>
                        <span class="double-price-extra">₹ 0.50/m</span>
                    </div>
                    <div className="double-stars">☆☆☆☆☆ (No reviews)</div>
                    <button class="double-btn">Add to Cart</button>
                </div>

                {/* Column 3: Mechanical Puppy Kit & GI Wire Rope (Split) */}
                <div className="double_box2">
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP10', name: 'DIY Voice-Controlled Mechanical Puppy STEM Kit', price: 249.00, img: '' })}>
                        <div className="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">DIY Voice-Controlled Mechanical Puppy STEM Kit</div>
                            <div className="double-price-block">
                                <span className="double-price-now">₹ 249.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                    <div className="double_subbox"
                        onClick={() => addCustomProductToCart({ id: 'DP11', name: 'GI Wire Rope Thimble Rigging', price: 13.00, img: '' })}>
                        <div className="double-img-placeholder horizontal-img"></div>
                        <div className="double-details">
                            <div className="double-title">GI Wire Rope Thimble Rigging</div>
                            <div className="double-price-block">
                                <span className="double-price-now">From ₹ 13.00</span>
                            </div>
                            <div className="double-stars">☆☆☆☆☆</div>
                        </div>
                    </div>
                </div>

                {/* Column 4: Namo IEC AC Power Socket (Tall) */}
                <div className="double_box1"
                    onClick={() => addCustomProductToCart({ id: 'DP12', name: 'Namo Electric: IEC AC Power Inlet Socket', price: 39.00, img: '' })}>
                    <div className="double-img-placeholder vertical-img"></div>
                    <div className="double-title">Namo Electric: IEC AC Power Inlet Socket</div>
                    <div className="double-price-block">
                        <span className="double-price-now">From ₹ 39.00</span>
                    </div>
                    <div class="double-stars">☆☆☆☆☆ (No reviews)</div>
                    <button className="double-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default DoubleBoxRow;
