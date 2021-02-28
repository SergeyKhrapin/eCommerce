import React from 'react';
import { connect } from 'react-redux';
import CartPopupItem from './CartPopupItem';
import CartPopupCTA from './CartPopupCTA';
import CartEmpty from '../cart/CartEmpty';
import { closeCartPopup } from '../redux/actionCreators';

const CartPopupBody = ({ products, closeCartPopup }) => {
    return (
        <>
            <div
                className="CartPopup-close"
                onClick={closeCartPopup}
                data-testid="cart-popup-close"></div>
            <div className="CartPopup" data-testid="cart-popup">
                <div className="container">
                    { !products.length && <CartEmpty /> }
                    { products.map(item => <CartPopupItem item={item} key={item.product.id} />) }
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
    closeCartPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPopupBody);
