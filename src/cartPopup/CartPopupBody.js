import React from 'react';
import { connect } from 'react-redux';
import CartPopupCTA from './CartPopupCTA';
import CartEmpty from '../cart/CartEmpty';
import { closeCartPopup, removeProductFromCart } from '../redux/actionCreators';
import { getImageSrc, getFormattedPrice } from '../helpers';

const CartPopupBody = ({ products, removeProductFromCart, closeCartPopup }) => {
    return (
        <>
            <div className="CartPopup-close" onClick={closeCartPopup}></div>
            <div className="CartPopup">
                <div className="container">
                    { !products.length && <CartEmpty /> }
                    { products.map(item => {
                        const { product, quantity } = item;
                        const { id, image, brand, title, price } = product;
                        return (
                            <div className="row" key={id}>
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
                    }) }
                    { products.length && <CartPopupCTA /> }
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        products: Object.values(state.cart.products)
    };
};

const mapDispatchToProps = {
    removeProductFromCart,
    closeCartPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPopupBody);
