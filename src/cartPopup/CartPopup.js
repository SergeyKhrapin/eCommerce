import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openCartPopup, closeCartPopup } from '../redux/actionCreators';
import { getImageSrc, getFormattedPrice } from '../helpers';
import { CART_POPUP, CART_EMPTY, TOTAL, VIEW_CART, CHECKOUT } from '../constants';
import './CartPopup.scss';

const CartPopup = props => {
    const { products, totalPrice, openCartPopup, closeCartPopup, openPopup } = props;

    function renderCartPopup() {
        return (
            <>
                <div className="CartPopup-close" onClick={closeCartPopup}></div>
                <div className="CartPopup">
                    <div className="container">
                        { !products.length && renderEmptyCartMessage() }
                        { products.map((item, i) => {
                            const { product, quantity } = item;
                            const { image, brand, title, price } = product;
                            return (
                                <div className="row" key={i}>
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
                                    </div>
                                </div>
                            );
                        }) }
                        { products.length && renderCartPopupCTA() }
                    </div>
                </div>
            </>
        );
    }

    function renderEmptyCartMessage() {
        return (
            <div className="row">
                <p>{CART_EMPTY}</p>
            </div>
        );
    }

    function renderCartPopupCTA() {
        return (
            <>
                <div className="row pt-2 border-top">
                    <div className="col-6 text-start">{TOTAL}</div>
                    <div className="col-6 text-end">{getFormattedPrice(totalPrice)}</div>
                </div>
                <div className="row mt-3">
                    <div className="CartPopup-viewCart col-6 text-start">
                        <button className="btn btn-light">
                            <Link to="/cart" onClick={closeCartPopup}>{VIEW_CART}</Link>
                        </button>
                    </div>
                    <div className="CartPopup-checkout col-6 text-end">
                        <button className="btn btn-dark">{CHECKOUT}</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="CartPopup-open">
                <div className="container">
                    <div className="row">
                        <div className="col-2 offset-md-10 text-end">
                            <span className="CartPopup-open--link" onClick={openCartPopup}>{CART_POPUP}</span>
                        </div>
                    </div>
                </div>
            </div>
           { openPopup && renderCartPopup() } 
        </>
    );
};

const mapStateToProps = state => {
    return {
        products: Object.values(state.cart.products),
        totalPrice: state.cart.totalPrice,
        openPopup: state.cart.openPopup
    };
};

const mapDispatchToProps = {
    openCartPopup,
    closeCartPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPopup);
