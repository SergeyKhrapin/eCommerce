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
                    onClick={openCartPopup}>
                        {`${CART_POPUP} ${totalQuantity ? `(${totalQuantity})` : ''}`}
                </span>
            </div>
           { openPopup && <CartPopupBody /> } 
        </>
    );
};

const mapStateToProps = state => {
    return {
        totalPrice: state.cart.totalPrice,
        totalQuantity: state.cart.totalQuantity,
        openPopup: state.cart.openPopup
    };
};

const mapDispatchToProps = {
    openCartPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPopup);
