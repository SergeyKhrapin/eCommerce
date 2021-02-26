import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_HEADING, CONTINUE_SHOPPING } from '../constants';
import { getFormattedPrice } from '../helpers';
import CartProductsCaption from './CartProductsCaption';
import CartProductsList from './CartProductsList';
import CartOverview from './CartOverview';
import CartEmpty from './CartEmpty';
import './Cart.scss';

const Cart = () => {
    const { products, totalPrice, totalQuantity } = useSelector(state => state.cart);
    const totalPriceValue = getFormattedPrice(totalPrice);

    return (
        <div className="Cart">
            <div className="container">
                <div className="row">
                    <h1 className="Cart-header text-dark">{CART_HEADING}</h1>
                </div>
                <div className="row">
                    <section className="Cart-products">
                        { !totalQuantity ? (
                            <CartEmpty />
                        ) : (
                            <>
                                <CartProductsCaption />
                                <CartProductsList products={products} />
                                <CartOverview totalPriceValue={totalPriceValue} />
                            </>
                        )}
                    </section>
                </div>
            </div>
            <Link to="/">{CONTINUE_SHOPPING}</Link>
        </div>
    );
};

export default Cart;
