import React from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchProducts } from '../redux/actionCreators';
import { getProductDetails } from '../helpers';

const requireProduct = (Component) => {
    function EnhancedComponent({ products, fetchProducts }) {
        const { id } = useParams();
        const product = getProductDetails(products, id);

        if (!products.length) {
            fetchProducts();
        }

        if (id != product.id) {
            return <h2>Product id {id} not found. Please go to Home page.</h2>;
        }

        return <Component {...product} />
    }

    // For debugging purposes mostly
    const enhancedComponentName = Component.displayName || Component.name || 'Component';
    EnhancedComponent.displayName = `requireProduct(${enhancedComponentName})`;

    const mapStateToProps = (state) => {
        return {
            products: state.allProducts
        }
    };
    
    const mapDispatchToProps = {
        fetchProducts
    };

    return connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent);
}

export default requireProduct;
