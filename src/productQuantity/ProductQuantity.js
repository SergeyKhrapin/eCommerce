import React from 'react';
import { useSelector } from 'react-redux';
import { INCREASE, DECREASE } from '../constants';
import styles from './productQuantity.module.css';

const ProductQuantity = props => {
    const { handleQuantity, quantity, product } = props;

    // From Product page - use quantity from props
    // From Cart page - use quantity from store
    const productQuantity = quantity ?? useSelector(store => store.cart.products[product.id].quantity);

    return (
        <div className={styles.quantity}>
            <div className={styles.control}>
                <input
                    className={styles.controlQuantity}
                    value={productQuantity}
                    type="text"
                    readOnly />
                <div className={styles.controlButtons} onClick={handleQuantity}>
                    <button id={INCREASE}>+</button>
                    <button id={DECREASE}>-</button>
                </div>
            </div>
        </div>
    )
};

export default ProductQuantity;
