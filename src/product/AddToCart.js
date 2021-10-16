import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProductQuantity from '../productQuantity/ProductQuantity';
import { addProductToCart } from '../redux/actionCreators';
import { ADD_TO_CART } from '../constants';
import { increaseQuantity, decreaseQuantity } from '../helpers';
import styles from './product.module.css';

const AddToCart = ({ product, addProductToCart }) => {
    const [ quantity, setQuantity ] = useState(1);

    const increase = () => {
        increaseQuantity(quantity, () => {
            setQuantity(quantity => ++quantity);
        })
    }

    const decrease = () => {
        decreaseQuantity(quantity, () => {
            setQuantity(quantity => --quantity);
        })
    }

    return (
        <>
            <ProductQuantity quantity={quantity} increase={increase} decrease={decrease} />
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
