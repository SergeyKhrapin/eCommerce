import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_HEADING, CONTINUE_SHOPPING } from '../constants';
import { getFormattedPrice } from '../helpers';
import CartProductsCaption from './CartProductsCaption';
import CartProductsList from './CartProductsList';
import CartOverview from './CartOverview';
import CartEmpty from './CartEmpty';
import styles from "./cart.module.css";

const Cart = ({ cart }) => {
    const { products, totalPrice, totalQuantity } = cart;
    const totalPriceValue = getFormattedPrice(totalPrice);

    return (
        <>
            <Helmet>
                <meta property="og:description" content="Cart Page" />
                <title>E-commerce single page app - Cart page</title>
            </Helmet>
            <div className={styles.cart}>
                <div className="container">
                    <div className="row">
                        <h1 className={`${styles.header} text-dark`}>{CART_HEADING}</h1>
                    </div>
                    <div className="row">
                        <section className={styles.products}>
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
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
};

export default connect(mapStateToProps)(Cart);
