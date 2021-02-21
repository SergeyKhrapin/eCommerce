import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import AddToCart from './AddToCart';
import { getProductDetails, getImageSrc, getFormattedPrice } from '../helpers';
import './Product.scss';

const Product = () => {
    const products = useSelector(store => store.allProducts);
    const { id } = useParams();
    const product = getProductDetails(products, id);
    const { image, brand, title, price, description } = product;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price);

    return (
        <div className="Product">
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <div className="Product-imageSection">
                            <img
                                src={imageSrc}
                                className="Product-image"
                                alt={`${brand} - ${title}`} />
                        </div>
                    </div>
                    <div className="col-5">
                        <p className="Product-brand product-brand">
                            {brand}
                        </p>
                        <h1 className="Product-title">
                            {title}
                        </h1>
                        <p className="Product-price product-price">
                            <meta itemProp="priceCurrency" content="USD" />
                            <span itemProp="price" content={priceValue}>
                                {priceValue}
                            </span>
                        </p>
                        <p className="Product-description">
                            {description}
                        </p>
                        <div className="Product-addToCart mt-4">
                            <AddToCart product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Product;
