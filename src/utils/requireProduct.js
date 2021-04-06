import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchProducts } from '../redux/actionCreators';
import { getProductDetails } from '../helpers';

const requireProduct = (Component) => {
    function EnhancedComponent() {
        const dispatch = useDispatch()
        const products = useSelector(store => store.allProducts);
        const { id } = useParams();
        const product = getProductDetails(products, id);

        if (!products.length) {
            dispatch(fetchProducts());
        }

        if (id != product.id) {
            return <h2>Product id {id} not found. Please go to Home page.</h2>;
        }

        return <Component {...product} />
    }

    // For debugging purposes mostly
    const enhancedComponentName = Component.displayName || Component.name || 'Component'
    EnhancedComponent.displayName = `requireProduct(${enhancedComponentName})`

    return EnhancedComponent
}

export default requireProduct
