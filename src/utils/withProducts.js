import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProductDetails } from '../helpers';

const withProduct = () => (Component) => {
    function EnhancedComponent() {
        const products = useSelector(store => store.allProducts);
        const { id } = useParams();
        const product = getProductDetails(products, id);

        if (!products.length || id != product.id) {
            return <h2>Product id {id} not found. Please go to Home and reload the page.</h2>
        }
        return <Component {...product} />
    }

    return EnhancedComponent
}

export default withProduct
