import { ADD_PRODUCT_TO_CART, CLOSE_CART_POPUP, DECREASE_PRODUCT_QUANTITY_IN_CART, HIDE_ALERT, OPEN_CART_POPUP, REMOVE_PRODUCT_FROM_CART, SHOW_ALERT } from "../actionTypes";
import { ONE_PRODUCT_MAX_QUANTITY_IN_CART, ONE_PRODUCT_MAX_QUANTITY_ALERT, TOTAL_MAX_QUANTITY_IN_CART, TOTAL_MAX_QUANTITY_ALERT, PRODUCT_SUCCESSFULLY_ADDED_ALERT } from '../../constants';

const initialState = {
    products: {},
    totalQuantity: 0,
    totalPrice: 0,
    alert: null,
    openPopup: null
};

export const cartReducer = (state = initialState, action) => {
    let { products: productsInCart,
          totalQuantity: productsQuantityInCart,
          totalPrice } = state;
    let { type, payload } = action;
    let { product, quantity } = payload ?? {};
    
    switch (type) {
        case ADD_PRODUCT_TO_CART:
            // If the product is already in the cart - increase its quantity
            // If there is no yet this product in the cart:
            // ~~undefined?.quantity + quantity >>> ~~undefined + quantity >>> 0 + quantity
            let increasedQuantity = ~~productsInCart[product.id]?.quantity + quantity;

            // Max limit all products in the cart reached
            if (productsQuantityInCart + quantity > TOTAL_MAX_QUANTITY_IN_CART) {
                return {
                    ...state,
                    alert: TOTAL_MAX_QUANTITY_ALERT
                };
            }
            
            // Max limit per one product in the cart reached
            if (increasedQuantity > ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                return {
                    ...state,
                    alert: ONE_PRODUCT_MAX_QUANTITY_ALERT
                };
            }

            return {
                ...state,
                products: {
                    ...productsInCart,
                    [product.id]: {product, quantity: increasedQuantity}
                },
                totalQuantity: productsQuantityInCart + quantity,
                totalPrice: totalPrice + product.price * quantity,
                alert: PRODUCT_SUCCESSFULLY_ADDED_ALERT
            };

        case DECREASE_PRODUCT_QUANTITY_IN_CART:
            return {
                ...state,
                products: {
                    ...productsInCart,
                    [product.id]: {
                        product,
                        quantity: state.products[product.id].quantity - 1
                    }
                },
                totalQuantity: state.totalQuantity - 1,
                totalPrice: totalPrice - product.price
            };

        case REMOVE_PRODUCT_FROM_CART:
            // Remove a product without mutation
            const { [product.id]: omit, ...updatedProductsInCart } = productsInCart;
            return {
                ...state,
                products: updatedProductsInCart,
                totalQuantity: state.totalQuantity - quantity,
                totalPrice: totalPrice - product.price * quantity
            };

        case HIDE_ALERT:
            return {
                ...state,
                alert: false
            };

        case OPEN_CART_POPUP:
            return {
                ...state,
                openPopup: true
            }

        case CLOSE_CART_POPUP:
            return {
                ...state,
                openPopup: false
            }

        default:
            return state;
    }
};
