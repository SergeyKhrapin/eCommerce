import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addProductToCart } from '../redux/actionCreators';
import { ADD_TO_CART, INCREASE, DECREASE, ONE_PRODUCT_MAX_QUANTITY_IN_CART } from '../constants';
import './AddToCart.scss';

const AddToCart = props => {
    let { product, addProductToCart } = props;
    let [ quantity, setQuantity ] = useState(1);
    const rootClass = 'add-to-cart';

    function handleQuantity(e) {
        switch (e.target.id) {
            case INCREASE:
                if (quantity < ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                    setQuantity(quantity => ++quantity);
                }
                break;
            case DECREASE:
                if (quantity > 1) {
                    setQuantity(quantity => --quantity);
                }
                break;
        }
    }

    return (
        <div className={rootClass}>
            <div className={`${rootClass}__control`}>
                <input
                    className={`${rootClass}__control--quantity`}
                    value={quantity}
                    type="text"
                    readOnly />
                <div className={`${rootClass}__control--buttons`} onClick={handleQuantity}>
                    <button id={INCREASE}>+</button>
                    <button id={DECREASE}>-</button>
                </div>
            </div>
            <button
                className={`${rootClass}__add btn btn-dark`}
                onClick={() => addProductToCart(product, quantity)}>
                    {ADD_TO_CART}
            </button>
        </div>
    )
};

const mapDispatchToProps = {
    addProductToCart
};

export default connect(null, mapDispatchToProps)(AddToCart);
