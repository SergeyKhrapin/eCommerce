import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProductQuantity from '../productQuantity/ProductQuantity';
import { addProductToCart, removeProductFromCart } from '../redux/actionCreators';
import { INCREASE, DECREASE, ONE_PRODUCT_MAX_QUANTITY_IN_CART } from '../constants';
import '../productQuantity/ProductQuantity.scss';

const AddToCart = props => {
    let { product,
          quantity: productQuantity,
          addProductToCart,
          removeProductFromCart } = props;

    let [ quantity, setQuantity ] = useState(productQuantity);

    function handleQuantity(e) {
        switch (e.target.id) {
            case INCREASE:
                if (quantity < ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                    setQuantity(quantity => ++quantity);
                    addProductToCart(product);
                }
                break;
            case DECREASE:
                if (quantity > 1) {
                    setQuantity(quantity => --quantity);
                    removeProductFromCart(product);
                }
                break;
        }
    }

    const propsObj = { handleQuantity, quantity };

    return <ProductQuantity {...propsObj} />;
};

const mapDispatchToProps = {
    addProductToCart,
    removeProductFromCart
};

export default connect(null, mapDispatchToProps)(AddToCart);
