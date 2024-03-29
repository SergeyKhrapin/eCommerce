import React from 'react';
import { connect } from 'react-redux';
import Alert from '../alert/Alert';
import { getImageSrc } from '../helpers';
import { PRUDUCTS_UNAVAILABLE_MESSAGE } from '../constants';
import ProductTile from './ProductTile';
import styles from './category.module.css';

const Category = ({ products, isAlert }) => {
    return (
        <div className="container">
            { isAlert && <Alert /> }
            <div className="row">
                <div className="col-12">
                    <div className={styles.categoryBanner}>
                        <img className={styles.categoryBannerImage} src={getImageSrc('plates-header.jpg')} alt="Home page banner" />
                        <div className={styles.categoryBannerContent}>
                            <h1>Plates</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum eveniet rem ad culpa quidem incidunt laborum accusamus eius earum animi aliquid corporis inventore ex, dignissimos consequuntur expedita, vitae distinctio odit.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                { products.length ? (
                    products.map(product => <ProductTile product={product} key={product.id} />)
                ) : (
                    <h1>{PRUDUCTS_UNAVAILABLE_MESSAGE}</h1>
                ) }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.allProducts,
        isAlert: state.cart.alert
    }
};

export default connect(mapStateToProps)(Category);
