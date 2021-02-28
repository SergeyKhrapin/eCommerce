import React from 'react';
import { connect } from 'react-redux';
import CartPopupBody from '../cartPopup/CartPopupBody';
import { openCartPopup } from '../redux/actionCreators';
import { CART_POPUP } from '../constants';
import './CartPopup.scss';

const CartPopup = props => {
    const { totalQuantity, openCartPopup, openPopup } = props;

    return (
        <>
            <div className="CartPopup-open">
                <span
                    className="CartPopup-open--link"
                    aria-expanded={openPopup ? 'true' : 'false'}
                    onClick={openCartPopup}
                    data-testid="cart-popup-open-link">
                        {`${CART_POPUP} ${totalQuantity ? `(${totalQuantity})` : ''}`}
                </span>
            </div>
           { openPopup && <CartPopupBody /> } 
        </>
    );
};

const mapStateToProps = state => {
    return {
        totalQuantity: state.cart.totalQuantity,
        openPopup: state.cart.openPopup
    };
};

const mapDispatchToProps = {
    openCartPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPopup);
