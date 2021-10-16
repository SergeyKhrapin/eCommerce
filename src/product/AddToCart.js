import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProductQuantity from '../productQuantity/ProductQuantity';
import { addProductToCart } from '../redux/actionCreators';
import { ADD_TO_CART, INCREASE, DECREASE, ONE_PRODUCT_MAX_QUANTITY_IN_CART } from '../constants';
import styles from './product.module.css';

const AddToCart = props => {
    let { product, addProductToCart } = props;
    let [ quantity, setQuantity ] = useState(1);

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

    const propsObj = { handleQuantity, quantity };

    return (
        <>
            <ProductQuantity {...propsObj} />
            <button
                className={`${styles.addToCartButton} btn btn-dark`}
                onClick={() => addProductToCart(product, quantity)}>
                    {ADD_TO_CART}
            </button>
        </>
    )
};

const mapDispatchToProps = {
    addProductToCart
};

export default connect(null, mapDispatchToProps)(AddToCart);
