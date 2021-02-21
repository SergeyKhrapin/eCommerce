import React from 'react';
import { INCREASE, DECREASE } from '../constants';
import './ProductQuantity.scss';

const ProductQuantity = ({ handleQuantity, quantity }) => {
    return (
        <div className="add-to-cart">
            <div className="add-to-cart__control">
                <input
                    className="add-to-cart__control--quantity"
                    value={quantity}
                    type="text"
                    readOnly />
                <div className="add-to-cart__control--buttons" onClick={handleQuantity}>
                    <button id={INCREASE}>+</button>
                    <button id={DECREASE}>-</button>
                </div>
            </div>
        </div>
    )
};

export default ProductQuantity;
