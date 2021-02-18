import { FETCH_PRODUCTS } from "./actionTypes"

export const fetchProducts = () => {
    console.log('fetchProducts')

    return async dispatch => {
        const response     = await fetch('products.json')
        const responseJSON = await response.json()

        dispatch({
            type: FETCH_PRODUCTS,
            payload: responseJSON
        })
    }
}
