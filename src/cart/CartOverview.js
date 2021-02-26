import React from 'react';
import { CART_OVERVIEW, SUBTOTAL, TOTAL } from '../constants';


const CartOverview = ({ totalPriceValue }) => {
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
};

export default CartOverview;
