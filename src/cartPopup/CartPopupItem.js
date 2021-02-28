import React from 'react';
import { connect } from 'react-redux';
import { removeProductFromCart } from '../redux/actionCreators';
import { getImageSrc, getFormattedPrice } from '../helpers';

const CartPopupItem = ({ item, removeProductFromCart }) => {
    const { product, quantity } = item;
    const { id, image, brand, title, price } = product;

    return (
        <div className="row">
            <div className="col-12 d-flex text-start mb-4">
                <img
                    className="CartPopup-image"
                    src={getImageSrc(image)}
                    alt={`${brand} - ${title}`} />
                <div className="CartPopup-details">
                    <h5 className="CartPopup-details--title">{title}</h5>
                    <span className="CartPopup-details--quantity">x {quantity}</span>
                    <span className="CartPopup-details--brand product-brand">{brand}</span>
                    <span className="CartPopup-details--price">{getFormattedPrice(price)}</span>
                </div>
                <button
                    className="CartPopup-remove remove-button"
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
