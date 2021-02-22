import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '../alert/Alert';
import { PRUDUCTS_UNAVAILABLE_MESSAGE } from '../constants';
import ProductTile from './ProductTile';
import './Category.css';

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
        return products.map((product, i) => <ProductTile product={product} key={i} />)
    }

    return (
        <div className="Category">
            <div className="container">
                { isAlert && <Alert /> }
                <div className="row">
                    { renderProducts() }
                </div>
            </div>
        </div>
    )
}

export default Category;
