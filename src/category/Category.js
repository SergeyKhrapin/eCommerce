import React from 'react';
import { useSelector } from 'react-redux'
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
            <h1>Category</h1>
            <ul>
                { products.map((product, i) => (
                    <li key={i}>
                        {product.title}
                        <br />
                        {product.brand}
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default Category;
