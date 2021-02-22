import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProductQuantity from '../productQuantity/ProductQuantity';
import { addProductToCart, showAlert } from '../redux/actionCreators';
import { ADD_TO_CART, INCREASE, DECREASE, ONE_PRODUCT_MAX_QUANTITY_IN_CART } from '../constants';
import '../productQuantity/ProductQuantity.scss';

const AddToCart = props => {
    let { product, addProductToCart, showAlert } = props;
    let [ quantity, setQuantity ] = useState(1);

    function handleQuantity(e) {
        switch (e.target.id) {
            case INCREASE:
                if (quantity < ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                    setQuantity(quantity => ++quantity);
                }
                break;
            case DECREASE:
                if (quantity > 1) {
                    setQuantity(quantity => --quantity);
                }
                break;
        }
    }

    function addProduct() {
        showAlert(product, quantity);
        addProductToCart(product, quantity);
    }

    const propsObj = { handleQuantity, quantity };

    return (
        <>
            <ProductQuantity {...propsObj} />
            <button
                className="Product-addToCart--button btn btn-dark"
                onClick={addProduct}>
                    {ADD_TO_CART}
            </button>
        </>
    )
};

const mapDispatchToProps = {
    addProductToCart,
    showAlert
};

export default connect(null, mapDispatchToProps)(AddToCart);
