import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { ADD_TO_CART } from '../constants';
import { getProductDetails, getImageSrc, getFormattedPrice } from '../helpers';
import './AddToCart.scss';

const AddToCart = () => {
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
            <button className={`${rootClass}__add btn btn-dark`}>{ADD_TO_CART}</button>
        </div>
    )
}

export default AddToCart;
