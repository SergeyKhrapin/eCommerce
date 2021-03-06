import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '../alert/Alert';
import { getImageSrc } from '../helpers';
import { PRUDUCTS_UNAVAILABLE_MESSAGE } from '../constants';
import ProductTile from './ProductTile';
import './Category.scss';

const Category = () => {
    const { products, isAlert } = useSelector(store => {
        return {
            products: store.allProducts,
            isAlert: store.cart.alert
        };
    });
    
    function renderProducts() {
        if (!products.length) {
            return <h1>{PRUDUCTS_UNAVAILABLE_MESSAGE}</h1>;
        }
        return products.map(product => <ProductTile product={product} key={product.id} />)
    }

    return (
        <div className="Category">
            <div className="container">
                { isAlert && <Alert /> }
                <div className="row">
                    <div className="col-12">
                        <div className="Category-banner">
                            <img className="Category-banner--image" src={getImageSrc('plates-header.jpg')} alt="Home page banner" />
                            <div className="Category-banner--content">
                                <h1>Plates</h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum eveniet rem ad culpa quidem incidunt laborum accusamus eius earum animi aliquid corporis inventore ex, dignissimos consequuntur expedita, vitae distinctio odit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    { renderProducts() }
                </div>
            </div>
        </div>
    )
}

export default Category;
