import React from 'react';
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import AddToCart from './AddToCart';
import Alert from '../alert/Alert';
import { getProductDetails, getImageSrc, getFormattedPrice } from '../helpers';
import './Product.scss';

const Product = () => {
    const products = useSelector(store => store.allProducts);
    const isAlert = useSelector(store => store.cart.alert);
    const { id } = useParams();
    const product = getProductDetails(products, id);
    const { id: ID, image, brand, title, price, description } = product;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price);

    if (id != ID) {
        return <h2>Something went wrong. Please go to Home and reload the page.</h2>;
    }

    return (
        <>
            <Helmet>
                <meta property="og:description" content="Product Details Page" data-react-helmet="true" />
                <title>E-commerce single page app - PDP</title>
            </Helmet>
            <div className="Product">
                <div className="container">
                    { isAlert && <Alert /> }
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
        </>
    )
};

export default Product;
