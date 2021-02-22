import { ADD_PRODUCT_TO_CART, DECREASE_PRODUCT_QUANTITY_IN_CART, HIDE_ALERT, REMOVE_PRODUCT_FROM_CART, SHOW_ALERT } from "../actionTypes";
import { ONE_PRODUCT_MAX_QUANTITY_IN_CART, ONE_PRODUCT_MAX_QUANTITY_ALERT, TOTAL_MAX_QUANTITY_IN_CART, TOTAL_MAX_QUANTITY_ALERT } from '../../constants';

const initialState = {
    products: {},
    totalQuantity: 0,
    totalPrice: 0,
    alert: null
};

export const cartReducer = (state = initialState, action) => {
    let { products: productsInCart,
          totalQuantity: productsQuantityInCart,
          totalPrice } = state;
    let { type, payload } = action;
    let { product, quantity } = payload ?? {};
    
    switch (type) {
        case ADD_PRODUCT_TO_CART:
            let increasedQuantity = quantity;

            if (productsQuantityInCart + quantity > TOTAL_MAX_QUANTITY_IN_CART) {
                return state;
            }

            for (let productID in productsInCart) {
                // If the product is already in the cart - increase its quantity
                if (productID == product.id) {
                    const thisProductQuantityInCart = productsInCart[productID].quantity;
                    if (thisProductQuantityInCart + quantity <= ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                        increasedQuantity = quantity + thisProductQuantityInCart;
                    } else {
                        return state;
                    }
                    break;
                }
            }

            // alert(`${quantity} product${quantity > 1 ? 's' : ''} ${quantity > 1 ? 'are' : 'is'} successfully added to the cart. `);

            return {
                ...state,
                products: {
                    ...productsInCart,
                    [product.id]: {product, quantity: increasedQuantity}
                },
                totalQuantity: productsQuantityInCart + quantity,
                totalPrice: totalPrice + product.price * quantity
            };

        case DECREASE_PRODUCT_QUANTITY_IN_CART:
            return {
                ...state,
                products: {
                    ...productsInCart,
                    [product.id]: {
                        product,
                        quantity: --state.products[product.id].quantity
                    }
                },
                totalQuantity: --state.totalQuantity,
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

        case SHOW_ALERT:
            if (productsInCart[product.id]?.quantity + quantity > ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
                return {
                    ...state,
                    alert: ONE_PRODUCT_MAX_QUANTITY_ALERT
                };
            }
            if (productsQuantityInCart + quantity > TOTAL_MAX_QUANTITY_IN_CART) {
                return {
                    ...state,
                    alert: TOTAL_MAX_QUANTITY_ALERT
                };
            }
            return state;

        case HIDE_ALERT:
            return {
                ...state,
                alert: false
            };

        default:
            return state;
    }
};
