import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_HEADING, CART_OVERVIEW, CONTINUE_SHOPPING, SUBTOTAL, TOTAL, CART_EMPTY, PRODUCT, QUANTITY, ACTION } from '../constants';
import { getFormattedPrice } from '../helpers';
import CartItem from './CartItem';
import './Cart.scss';

const Cart = () => {
    const { products, totalPrice, totalQuantity } = useSelector(state => state.cart);
    console.log(totalQuantity);
    const totalPriceValue = getFormattedPrice(totalPrice);

    function renderProducts() {
        return Object.values(products).map((product, i) => <CartItem product={product} key={i} />);
    }

    function renderCartOverview() {
        return (
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
        );
    }

    function renderCartEmpty() {
        return <h2>{CART_EMPTY}</h2>;
    }

    return (
        <div className="Cart">
            <div className="container">
                <div className="row">
                    <h1 className="Cart-header text-dark">{CART_HEADING}</h1>
                </div>
                <div className="row">
                    <section className="Cart-products">
                        <div className="Cart-products-caption">
                            <div className="row">
                                <div className="col-7 text-start">{PRODUCT}</div>
                                <div className="col-2">{QUANTITY}</div>
                                <div className="col-2">{TOTAL}</div>
                                <div className="col-1 text-end">{ACTION}</div>
                            </div>
                        </div>
                        { totalQuantity > 0 && renderProducts() }
                        { totalQuantity > 0 && renderCartOverview() }
                        { totalQuantity == 0 && renderCartEmpty() }
                    </section>
                </div>
            </div>
            <Link to="/">{CONTINUE_SHOPPING}</Link>
        </div>
    );
};

export default Cart;
