import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../redux/actionCreators';
import { getImageSrc, getFormattedPrice, getPrettyTitleURL } from '../helpers';
import { VIEW_DETAILS, ADD_TO_CART } from '../constants';
import './ProductTile.scss';

const ProductTile = props => {
    const { addProductToCart, product } = props;
    const { id, image, brand, title, price } = product;

    const rootClass = 'ProductTile';
    const buttonClass = `${rootClass}-overlay--button btn btn-dark`;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price);

    return (
        <div className="col-4 mb-5">
            <div className={rootClass}>
                <div className={`${rootClass}-imageSection`}>
                    <img
                        src={imageSrc}
                        className={`${rootClass}-image`}
                        alt={`${brand} - ${title}`}/>
                    <div className={`${rootClass}-overlay`}>
                        <button className={`${buttonClass} mb-4`}>
                            <Link to={`/product/${id}/${getPrettyTitleURL(title)}`}>{VIEW_DETAILS}</Link>
                        </button>
                        <button
                            className={buttonClass}
                            onClick={() => addProductToCart(product)} >
                                {ADD_TO_CART}
                        </button>
                    </div>
                </div>
                <p className={`${rootClass}-brand product-brand`}>
                    {brand}
                </p>
                <h3 className={`${rootClass}-title`}>
                    {title}
                </h3>
                <p className={`${rootClass}-price product-price`}>
                    <meta itemProp="priceCurrency" content="USD" />
                    <span itemProp="price" content={priceValue}>
                        {priceValue}
                    </span>
                </p>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    addProductToCart
};

export default connect(null, mapDispatchToProps)(ProductTile);
