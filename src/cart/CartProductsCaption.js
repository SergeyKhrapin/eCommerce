import React, { memo } from 'react';
import { TOTAL, PRODUCT, QUANTITY, ACTION } from '../constants';

const CartProductsCaption = () => {
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

export default memo(CartProductsCaption);
