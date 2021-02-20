import { FETCH_PRODUCTS } from "../actionTypes";

export const productsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return state.concat(action.payload);
        default:
            return state;
    }
}
