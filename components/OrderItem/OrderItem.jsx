import React from 'react';
import './OrderItem.sass';

const OrderItem = ({number, status, address, quantity, total}) => {
    return (
        <li className="order-item">
            <div className="order-item__text-inn">
                <div className="order-item__text-box">
                    <h3 className="order-item__text"><span>№{number}</span></h3>
                    <p className="order-item__text">
                        Status: <span>{status}</span>
                    </p>

                </div>
                <div>
                    <p className="order-item__text">Delivery Address: <span>{address}</span></p>
                    <p className="order-item__text">
                        {quantity} items
                    </p>
                </div>
            </div>
            <div className="order-item__btn-wrapp">
                <div className="order-item__text-wrapp">
                    <p className="order-item__text">Total: <span>{total}</span></p>
                </div>
                <button className="order-item__btn">
                    MORE
                </button>
            </div>
        </li>
    );
}

export default OrderItem;
