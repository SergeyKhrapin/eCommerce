import React from 'react';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../constants';
import { addProductToCart } from '../redux/actionCreators';
import './AddToCart.scss';

const AddToCart = ({product, addProductToCart}) => {
    const rootClass = 'add-to-cart';

    return (
        <div className={rootClass}>
            <div className={`${rootClass}__control`}>
                <input className={`${rootClass}__control--quantity`} type="text"/>
                <div className={`${rootClass}__control--buttons`}>
                    <button>+</button>
                    <button>-</button>
                </div>
            </div>
            <button
                className={`${rootClass}__add btn btn-dark`}
                onClick={() => addProductToCart(product)}>
                    {ADD_TO_CART}
            </button>
        </div>
    )
}

const mapDispatchToProps = {
    addProductToCart
}

export default connect(null, mapDispatchToProps)(AddToCart);
