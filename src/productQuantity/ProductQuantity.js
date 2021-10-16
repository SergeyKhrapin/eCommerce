import React from 'react';
import { connect } from 'react-redux';
import { INCREASE, DECREASE } from '../constants';
import styles from './productQuantity.module.css';

const ProductQuantity = props => {
    const { handleQuantity, quantity, product, allProducts } = props;

    // From Product page - use quantity from props
    // From Cart page - use quantity from store
    const productQuantity = quantity ?? allProducts[product.id].quantity;

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

const mapStateToProps = (state) => {
    return {
        allProducts: state.cart.products
    }
};

export default connect(mapStateToProps)(ProductQuantity);
