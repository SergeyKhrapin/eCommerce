import React from 'react';
import { connect } from 'react-redux';
import AddToCart from "./AddToCart";
import { removeProductFromCart } from '../redux/actionCreators';
import { getImageSrc, getFormattedPrice } from "../helpers";
import { COLOR } from "../constants";
import './CartItem.scss';

const CartItem = props => {
    const { item, removeProductFromCart } = props;
    const { product, quantity } = item;
    const { image, brand, title, price, color } = product;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price, quantity);

    return (
        <div className="CartItem">
            <div className="row">
                <div className="col-7">
                    <div className="CartItem-details">
                        <img
                            className="CartItem-details--image"
                            src={imageSrc}
                            alt={`${brand} - ${title}`} />
                        <div>
                            <p className="CartItem-details--brand">{brand}</p>
                            <h3 className="CartItem-details--title text-dark">{title}</h3>
                            <p>{color ? `${COLOR}: ${color}` : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="CartItem-quantity">
                        <AddToCart product={product} quantity={quantity} />
                    </div>
                </div>
                <div className="col-2">
                    <p className="CartItem-price">{priceValue}</p>
                </div>
                <div className="col-1 d-flex justify-content-end text-end">
                    <button
                        className="CartItem-remove remove-button"
                        onClick={() => removeProductFromCart(product, quantity)}></button>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    removeProductFromCart
};

export default connect(null, mapDispatchToProps)(CartItem);
