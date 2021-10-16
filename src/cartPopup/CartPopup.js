import React from 'react';
import { connect } from 'react-redux';
import CartPopupBody from '../cartPopup/CartPopupBody';
import { openCartPopup } from '../redux/actionCreators';
import { CART_POPUP } from '../constants';
import styles from './cartPopup.module.css';

const CartPopup = props => {
    const { totalQuantity, openCartPopup, openPopup } = props;

    return (
        <>
            <div className={styles.cartPopupOpen}>
                <span
                    className={styles.cartPopupOpenLink}
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
