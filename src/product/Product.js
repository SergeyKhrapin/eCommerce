import React from 'react';
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import AddToCart from './AddToCart';
import Alert from '../alert/Alert';
import { getImageSrc, getFormattedPrice } from '../helpers';
import requireProduct from '../utils/requireProduct';
import styles from './product.module.css';

const Product = (props) => {
    const isAlert = useSelector(store => store.cart.alert);
    const { image, brand, title, price, description } = props;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price);

    return (
        <>
            <Helmet>
                <meta property="og:description" content="Product Details Page" data-react-helmet="true" />
                <title>E-commerce single page app - PDP</title>
            </Helmet>
            <div className="container">
                { isAlert && <Alert /> }
                <div className="row">
                    <div className="col-7">
                        <img
                            src={imageSrc}
                            className={styles.image}
                            alt={`${brand} - ${title}`} />
                    </div>
                    <div className="col-5">
                        <p className={`${styles.brand} product-brand`}>
                            {brand}
                        </p>
                        <h1 className={styles.title}>
                            {title}
                        </h1>
                        <p className={`${styles.price} product-price`}>
                            <meta itemProp="priceCurrency" content="USD" />
                            <span itemProp="price" content={priceValue}>
                                {priceValue}
                            </span>
                        </p>
                        <p className={styles.description}>
                            {description}
                        </p>
                        <div className={`${styles.addToCart} mt-4`}>
                            <AddToCart product={props} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default requireProduct(Product);
