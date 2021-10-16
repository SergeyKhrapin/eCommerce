import React, { memo } from 'react';
import { CART_OVERVIEW, SUBTOTAL, TOTAL } from '../constants';
import styles from "./cart.module.css";

const CartOverview = ({ totalPriceValue }) => {
    return (
        <div className={styles.overview} key={3}>
            <div className="col-6 offset-md-6">
                <p className={styles.overviewTitle}>{CART_OVERVIEW}</p>
                <div className={styles.overviewSubtotal}>
                    <span>{SUBTOTAL}</span>
                    <span>{totalPriceValue}</span>
                </div>
                <div className={styles.overviewTotal}>
                    <span>{TOTAL}</span>
                    <span className="text-dark">{totalPriceValue} CAD</span>
                </div>
            </div>
        </div>
    );
};

export default memo(CartOverview);
