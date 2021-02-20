import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../actionTypes";

export const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            let { payload: {product, quantity} } = action;

            // If the product is already in the cart - just increase its quantity
            for (let productID in state) {
                if (productID == product.id) {
                    quantity = ++state[productID].quantity;
                    break;
                }
            }

            return {...state, [product.id]: {product, quantity}};
        case REMOVE_PRODUCT_FROM_CART:
            // do something
        default:
            return state
    }
}
