import React from 'react';
import { useSelector } from 'react-redux';
import { INCREASE, DECREASE } from '../constants';
import './ProductQuantity.scss';

const ProductQuantity = props => {
    let { handleQuantity, quantity, product } = props;

    // From Product page - use quantity from props
    // From Cart page - use quantity from store
    quantity = quantity ?? useSelector(store => store.cart.products[product.id].quantity);

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
