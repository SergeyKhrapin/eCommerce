import React from 'react';
import { connect } from 'react-redux';
import ProductQuantity from '../productQuantity/ProductQuantity';
import { addProductToCart, decreaseProductQuantityInCart } from '../redux/actionCreators';
import { increaseQuantity, decreaseQuantity } from '../helpers';

const AddToCart = props => {
    const { product,
          quantity: productQuantity,
          addProductToCart,
          decreaseProductQuantityInCart } = props;

    const increase = () => {
        increaseQuantity(productQuantity, () => {
            addProductToCart(product);
        })
    }

    const decrease = () => {
        decreaseQuantity(productQuantity, () => {
            decreaseProductQuantityInCart(product)
        })
    }

    return <ProductQuantity product={product} increase={increase} decrease={decrease} />;
};

const mapDispatchToProps = {
    addProductToCart,
    decreaseProductQuantityInCart
};

export default connect(null, mapDispatchToProps)(AddToCart);
