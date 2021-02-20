import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_HEADING, CART_OVERVIEW, CONTINUE_SHOPPING, SUBTOTAL, TOTAL } from '../constants';
import { getFormattedPrice } from '../helpers';
import './Cart.scss';
import CartItem from './CartItem';

const Cart = () => {
    const { products, totalPrice } = useSelector(state => state.cart);
    const totalPriceValue = getFormattedPrice(totalPrice);

    function renderProducts() {
        return Object.values(products).map(product => <CartItem product={product} />);
    }

    return (
        <div className="Cart">
            <div className="container">
                <div className="row">
                    <h1 className="Cart-header text-dark">{CART_HEADING}</h1>    
                </div>
                <div className="row">
                    <section className="Cart-products">
                        { renderProducts() }
                        <div className="Cart-products-overview">
                            <div className="col-6 offset-md-6">
                                <p className="Cart-products-overview--title">{CART_OVERVIEW}</p>
                                <div className="Cart-products-overview--subtotal">
                                    <span>{SUBTOTAL}</span>
                                    <span>{totalPriceValue}</span>
                                </div>
                                <div className="Cart-products-overview--total">
                                    <span>{TOTAL}</span>
                                    <span className="text-dark">{totalPriceValue} CAD</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Link to="/">{CONTINUE_SHOPPING}</Link>
        </div>
    );
};

export default Cart;
