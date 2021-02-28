import React, { memo } from 'react';
import { CART_EMPTY } from '../constants';

const CartEmpty = () => {
    return <h2>{CART_EMPTY}</h2>;
};

export default memo(CartEmpty);
