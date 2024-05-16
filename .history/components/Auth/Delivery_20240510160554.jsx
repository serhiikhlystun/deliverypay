import React from 'react';
import './Auth.sass';
import CheckoutPrices from "./CheckoutPrices";

const Delivery = ({prices, deviceClass}) => {
    return (
        <div className="delivery__content ">
            <div className="delivery__title-wrapp">
                <h2 className="delivery__title">
                    Delivery INFORMATION
                </h2>
                <p className="delivery__subtitle">
                    YOU CAN CHANGE INFORMATION
                </p>
            </div>
            <div className="delivery__input-wrapp">
                <input className="delivery__input" type="text" placeholder="Mr Simon Lux"/>
                <input className="delivery__input" type="email" placeholder="Email"/>
                <input className="delivery__input" type="number" placeholder="PHONE"/>
                <input className="delivery__input" type="text" placeholder="ADDRESS "/>
                {/* <input className="delivery__input" type="text" placeholder="TG USERNAME"/> */}
            </div>
            <CheckoutPrices
                prices={prices}
                deviceClass={deviceClass}
            />
        </div>
    );
}

export default Delivery;
