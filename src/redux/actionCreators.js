import { SERVER_URL } from "../constants";
import { FETCH_PRODUCTS, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "./actionTypes";

export const fetchProducts = () => {
    return async dispatch => {
        const response     = await fetch(SERVER_URL);
        const responseJSON = await response.json();

        dispatch({
            type: FETCH_PRODUCTS,
            payload: responseJSON
        })
    }
}

export const addProductToCart = (product, quantity = 1) => {
    // Default value quantity = 1 is used when a product is added to cart from PLP
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: { product, quantity }
    }
}

export const removeProductFromCart = productID => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: productID
    }
}
