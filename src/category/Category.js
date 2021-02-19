import React from 'react';
import { useSelector } from 'react-redux';
import ProductTile from '../productTile/ProductTile';
import './Category.css';

const Category = () => {
    const products = useSelector(store => store.products);

    if (!products.length) {
        return (
            <div className="Category">
                <h1>Sorry, the products are unavailable</h1>
            </div>
        )
    }

    return (
        <div className="Category">
            <div className="container">
                <div className="row">
                    <h1>Category</h1>
                </div>
                <div className="row">
                    { products.map((product, i) => <ProductTile product={product} key={i} />) }
                </div>
            </div>
        </div>
    )
}

export default Category;
