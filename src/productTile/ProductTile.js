import React from 'react';
import { VIEW_DETAILS, ADD_TO_CART, CURRENCY } from './constants'
import './ProductTile.scss';

const ProductTile = ({product: {image, brand, title, price}}) => {
    const rootClass = 'ProductTile';
    const imageSrc = `/media/${image}`;
    const priceValue = Number(price).toFixed(2);
    const alt = `${brand} - ${title}`;

    return (
        <div className="col-4 mb-5">
            <div className={rootClass}>
                <div className={`${rootClass}-imageSection`}>
                    <img src={imageSrc} className={`${rootClass}-image`} alt={alt}/>
                    <div className={`${rootClass}-overlay`}>
                        <button className={`${rootClass}-overlay--button btn btn-dark mb-4`}>{VIEW_DETAILS}</button>
                        <button className={`${rootClass}-overlay--button btn btn-dark`}>{ADD_TO_CART}</button>
                    </div>
                </div>
                <p className={`${rootClass}-brand`}>
                    {brand}
                </p>
                <h3 className={`${rootClass}-title`}>
                    {title}
                </h3>
                <p className={`${rootClass}-price`}>
                    <meta itemProp="priceCurrency" content="USD" />
                    <span itemProp="price" content={priceValue}>
                        {CURRENCY}{priceValue}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ProductTile;
