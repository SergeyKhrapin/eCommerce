import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_HEADING, CART_OVERVIEW, CONTINUE_SHOPPING, SUBTOTAL, TOTAL, CART_EMPTY, PRODUCT, QUANTITY, ACTION } from '../constants';
import { getFormattedPrice } from '../helpers';
import CartItem from './CartItem';
import './Cart.scss';

const Cart = () => {
    const { products, totalPrice, totalQuantity } = useSelector(state => state.cart);
    const totalPriceValue = getFormattedPrice(totalPrice);

    function renderCartCaption() {
        return (
            <div className="Cart-products-caption" key={1}>
                <div className="row">
                    <div className="col-7 text-start">{PRODUCT}</div>
                    <div className="col-2">{QUANTITY}</div>
                    <div className="col-2">{TOTAL}</div>
                    <div className="col-1 text-end">{ACTION}</div>
                </div>
            </div>
        );
    }

    function renderCartProducts() {
        return Object.values(products).map((product, i) => <CartItem item={product} key={product.product.id} />);
    }

    function renderCartOverview() {
        return (
            <div className="Cart-products-overview" key={3}>
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

    const renders = [renderCartCaption, renderCartProducts, renderCartOverview];

    function renderCartEmpty() {
        return <h2>{CART_EMPTY}</h2>;
    }

    function renderCartContent() {
        if (!totalQuantity) {
            return renderCartEmpty();
        }
        return renders.map(render => render());
    }

    return (
        <div className="Cart">
            <div className="container">
                <div className="row">
                    <h1 className="Cart-header text-dark">{CART_HEADING}</h1>
                </div>
                <div className="row">
                    <section className="Cart-products">
                        { renderCartContent() }
                    </section>
                </div>
            </div>
            <Link to="/">{CONTINUE_SHOPPING}</Link>
        </div>
    );
};

export default Cart;
