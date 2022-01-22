import React from 'react';
import { connect } from 'react-redux';
import { removeProductFromCart } from '../redux/actionCreators';
import { getImageSrc, getFormattedPrice } from '../helpers';
import styles from './cartPopup.module.css';

const CartPopupItem = ({ item, removeProductFromCart }) => {
    const { product, quantity } = item;
    const { id, image, brand, title, price } = product;

    return (
        <div className="row">
            <div className="col-12 d-flex text-start mb-4" data-testid="cart-popup-item">
                <img
                    className={styles.cartPopupImage}
                    src={getImageSrc(image)}
                    alt={`${brand} - ${title}`} />
                <div className={styles.cartPopupDetails}>
                    <h5 className={styles.cartPopupDetailsTitle}>{title}</h5>
                    <span>x {quantity}</span>
                    <span className={`${styles.cartPopupDetailsBrand} product-brand`}>{brand}</span>
                    <span className={styles.cartPopupDetailsPrice}>{getFormattedPrice(price)}</span>
                </div>
                <button
                    className={`${styles.cartPopupRemove} remove-button`}
                    onClick={() => removeProductFromCart(product, quantity)}>
                </button>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    removeProductFromCart
};

export default connect(null, mapDispatchToProps)(CartPopupItem);
