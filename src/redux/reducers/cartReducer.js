import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../actionTypes";
import { ONE_PRODUCT_MAX_QUANTITY_IN_CART } from '../../constants';

export const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            let { payload: {product, quantity} } = action;

            for (let productID in state) {
                // If the product is already in the cart - increase its quantity
                if (productID == product.id) {
                    const thisProductQuantityInCart = state[productID].quantity;
                    if (thisProductQuantityInCart + quantity <= ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                        quantity += thisProductQuantityInCart;
                    } else {
                        alert(`Max limit per product in the cart - ${ONE_PRODUCT_MAX_QUANTITY_IN_CART} items. Please decrease the quantity.`);
                        return state;
                    }
                    break;
                }
            }

            return {...state, [product.id]: {product, quantity}};
        case REMOVE_PRODUCT_FROM_CART:
            // do something
        default:
            return state;
    }
}
