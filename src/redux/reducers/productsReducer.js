import { FETCH_PRODUCTS } from "../actionTypes"

const initialState = {
    products: []
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            // do something
            return state
        default:
            return state
    }
}
