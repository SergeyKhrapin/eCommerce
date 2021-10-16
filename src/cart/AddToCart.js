import React from 'react';
import { connect } from 'react-redux';
import ProductQuantity from '../productQuantity/ProductQuantity';
import { addProductToCart, decreaseProductQuantityInCart } from '../redux/actionCreators';
import { INCREASE, DECREASE, ONE_PRODUCT_MAX_QUANTITY_IN_CART } from '../constants';

const AddToCart = props => {
    const { product,
          quantity: productQuantity,
          addProductToCart,
          decreaseProductQuantityInCart } = props;

    function handleQuantity(e) {
        switch (e.target.id) {
            case INCREASE:
                if (productQuantity < ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                    addProductToCart(product);
                }
                break;
            case DECREASE:
                if (productQuantity > 1) {
                    decreaseProductQuantityInCart(product);
                }
                break;
        }
    }

    const propsObj = { handleQuantity, product };

    return <ProductQuantity {...propsObj} />;
};

const mapDispatchToProps = {
    addProductToCart,
    decreaseProductQuantityInCart
};

export default connect(null, mapDispatchToProps)(AddToCart);
