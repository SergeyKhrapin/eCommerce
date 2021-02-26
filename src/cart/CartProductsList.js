import React from 'react';
import CartItem from './CartItem';

const CartProductsList = ({ products }) => {
    return Object.values(products).map((product, i) => <CartItem item={product} key={product.product.id} />);
};

export default CartProductsList;
