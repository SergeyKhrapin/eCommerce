import { FETCH_PRODUCTS, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "./actionTypes";

export const fetchProducts = () => {
    return async dispatch => {
        const response     = await fetch('products.json')
        const responseJSON = await response.json()

        dispatch({
            type: FETCH_PRODUCTS,
            payload: responseJSON
        })
    }
}

export const addProductToCart = product => {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: {
            product: product,
            quantity: 1
        }
    }
}

export const removeProductFromCart = productID => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: productID
    }
}
