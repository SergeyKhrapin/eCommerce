import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../redux/actionCreators';
import { ADD_TO_CART, INCREASE, DECREASE, ONE_PRODUCT_MAX_QUANTITY_IN_CART } from '../constants';
import '../addToCart/AddToCart.scss';

const AddToCart = props => {
    let { product, quantity, addProductToCart, removeProductFromCart } = props;
    let [ productQuantity, setQuantity ] = useState(quantity);
    const rootClass = 'add-to-cart';

    function handleQuantity(e) {
        switch (e.target.id) {
            case INCREASE:
                if (productQuantity < ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                    setQuantity(productQuantity => ++productQuantity);
                    addProductToCart(product);
                }
                break;
            case DECREASE:
                if (productQuantity > 1) {
                    setQuantity(productQuantity => --productQuantity);
                    removeProductFromCart(product);
                }
                break;
        }
    }

    return (
        <div className={rootClass}>
            <div className={`${rootClass}__control`}>
                <input
                    className={`${rootClass}__control--quantity`}
                    value={productQuantity}
                    type="text"
                    readOnly />
                <div className={`${rootClass}__control--buttons`} onClick={handleQuantity}>
                    <button id={INCREASE}>+</button>
                    <button id={DECREASE}>-</button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    addProductToCart,
    removeProductFromCart
};

export default connect(null, mapDispatchToProps)(AddToCart);
