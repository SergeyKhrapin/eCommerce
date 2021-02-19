import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import AddToCart from '../addToCart/AddToCart';
import { getProductDetails, getImageSrc, getFormattedPrice } from '../helpers';
import { CURRENCY } from '../constants';
import './Product.scss';

const Product = () => {
    const rootClass = 'Product';
    const products = useSelector(store => store.allProducts);
    const { id } = useParams();
    const product = getProductDetails(products, id);
    const { image, brand, title, price, description } = product;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price);

    return (
        <div className={rootClass}>
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <div className={`${rootClass}-imageSection`}>
                            <img
                                src={imageSrc}
                                className={`${rootClass}-image`}
                                alt={`${brand} - ${title}`} />
                        </div>
                    </div>
                    <div className="col-5">
                        <p className={`${rootClass}-brand product-brand`}>
                            {brand}
                        </p>
                        <h1 className={`${rootClass}-title`}>
                            {title}
                        </h1>
                        <p className={`${rootClass}-price product-price`}>
                            <meta itemProp="priceCurrency" content="USD" />
                            <span itemProp="price" content={priceValue}>
                                {CURRENCY}{priceValue}
                            </span>
                        </p>
                        <p className={`${rootClass}-description`}>
                            {description}
                        </p>
                        <div className={`${rootClass}-addToCart mt-4`}>
                            <AddToCart product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;
