import React from 'react';
import './Auth.sass';

const CheckoutPrices = ({prices, deviceClass}) => {
    return (
        <div className={`delivery__checkout-wrapp ${deviceClass}`}>
            <div className="delivery__checkout-box">
                <p className="delivery__checkout-total">Total:</p>
                <p className="delivery__checkout-total">{prices.currency}{prices.totalPrice}</p>
            </div>
            <div className="delivery__checkout-box">
                <p className="delivery__checkout-discount">Discount:</p>
                <p className="delivery__checkout-discount">{prices.currency}{prices.discount}</p>
            </div>
            <button className="delivery__save-btn">CHECKOUT</button>
            <button className="delivery__save-btn" disabled={true}>CHECKOUT</button>
            <button className="delivery__save-btn white">CHECKOUT</button>
        </div>
    );
}

export default CheckoutPrices;
