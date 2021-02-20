import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../actionTypes";
import { ONE_PRODUCT_MAX_QUANTITY_IN_CART, TOTAL_MAX_QUANTITY_IN_CART } from '../../constants';

const initialState = {
    products: {},
    totalQuantity: 0,
    totalPrice: 0
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            let { products: productsInCart,
                  totalQuantity: productsQuantityInCart,
                  totalPrice } = state;
            let { payload: {product, quantity} } = action;
            let increasedQuantity = quantity;

            if (productsQuantityInCart + quantity > TOTAL_MAX_QUANTITY_IN_CART) {
                alert(`Max products limit in the cart - ${TOTAL_MAX_QUANTITY_IN_CART} items.`);
                return state;
            }

            for (let productID in productsInCart) {
                // If the product is already in the cart - increase its quantity
                if (productID == product.id) {
                    const thisProductQuantityInCart = productsInCart[productID].quantity;
                    if (thisProductQuantityInCart + quantity <= ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                        increasedQuantity = quantity + thisProductQuantityInCart;
                    } else {
                        alert(`Max limit per product in the cart - ${ONE_PRODUCT_MAX_QUANTITY_IN_CART} items. Please decrease the quantity.`);
                        return state;
                    }
                    break;
                }
            }

            alert(`${quantity} product${quantity > 1 ? 's' : ''} ${quantity > 1 ? 'are' : 'is'} successfully added to the cart. `);

            return {
                ...state,
                products: {
                    ...productsInCart,
                    [product.id]: {product, quantity: increasedQuantity}
                },
                totalQuantity: productsQuantityInCart + quantity,
                totalPrice: totalPrice + product.price * quantity
            };
        case REMOVE_PRODUCT_FROM_CART:
            // do something
        default:
            return state;
    }
};
