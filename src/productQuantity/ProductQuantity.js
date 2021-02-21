import React from 'react';
import { INCREASE, DECREASE } from '../constants';
import './ProductQuantity.scss';

const ProductQuantity = ({ handleQuantity, quantity }) => {
    return (
        <div className="product-quantity">
            <div className="product-quantity__control">
                <input
                    className="product-quantity__control--quantity"
                    value={quantity}
                    type="text"
                    readOnly />
                <div className="product-quantity__control--buttons" onClick={handleQuantity}>
                    <button id={INCREASE}>+</button>
                    <button id={DECREASE}>-</button>
                </div>
            </div>
        </div>
    )
};

export default ProductQuantity;
