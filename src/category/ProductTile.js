import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../redux/actionCreators';
import { getImageSrc, getFormattedPrice, getPrettyTitleURL } from '../helpers';
import { VIEW_DETAILS, ADD_TO_CART } from '../constants';
import styles from './productTile.module.css';

const ProductTile = props => {
    const { addProductToCart, product } = props;
    const { id, image, brand, title, price } = product;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price);

    return (
        <div className="col-4 mb-5">
            <div id={`productTile-${id}`} className={styles.productTile}>
                <div className={styles.productTileImageSection}>
                    <img
                        src={imageSrc}
                        className={styles.productTileImage}
                        alt={`${brand} - ${title}`}/>
                    <div className={styles.productTileOverlay}>
                        <button className={`${styles.productTileOverlayButton} btn btn-dark mb-4`}>
                            <Link to={`/product/${id}/${getPrettyTitleURL(title)}`}>{VIEW_DETAILS}</Link>
                        </button>
                        <button
                            id={`product-${id}`}
                            className={`${styles.productTileOverlayButton} btn btn-dark`}
                            onClick={() => addProductToCart(product)} >
                                {ADD_TO_CART}
                        </button>
                    </div>
                </div>
                <p className="product-brand">
                    {brand}
                </p>
                <h3 className={styles.productTileTitle}>
                    {title}
                </h3>
                <p className="product-price">
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
