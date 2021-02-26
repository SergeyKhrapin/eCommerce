import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeCartPopup } from '../redux/actionCreators';
import { getFormattedPrice } from '../helpers';
import { TOTAL, VIEW_CART, CHECKOUT } from '../constants';

const CartPopupCTA = ({ totalPrice, closeCartPopup }) => {
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
};

const mapStateToProps = state => {
    return {
        totalPrice: state.cart.totalPrice
    };
};

const mapDispatchToProps = {
    closeCartPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPopupCTA);
