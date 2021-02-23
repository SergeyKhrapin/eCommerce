import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from './App';
import { getFormattedPrice, getPrettyTitleURL, getProductDetails } from './helpers';
import { addProductToCart, decreaseProductQuantityInCart, removeProductFromCart, hideAlert, openCartPopup, closeCartPopup } from './redux/actionCreators';
import { ADD_PRODUCT_TO_CART, DECREASE_PRODUCT_QUANTITY_IN_CART, REMOVE_PRODUCT_FROM_CART } from './redux/actionTypes';
import { cartReducer } from './redux/reducers/cartReducer';
import { TOTAL_MAX_QUANTITY_IN_CART, TOTAL_MAX_QUANTITY_ALERT, ONE_PRODUCT_MAX_QUANTITY_IN_CART, ONE_PRODUCT_MAX_QUANTITY_ALERT } from './constants';

const stateMock = {
    products: {
        1000001: {
            product: { id: 1000001, price: 50, title: "Heme" },
            quantity: 2
        },
        1000003: {
            product: { id: 1000003, price: 40, title: 'MASHIKO' },
            quantity: 3
        }
    },
    totalQuantity: 5,
    totalPrice: 220,
    alert: null,
    openPopup: null
};

const actionMock = {
    type: 'SOME_TYPE',
    payload: {
        product: { id: 1000003, price: 40, title: 'MASHIKO' },
        quantity: 3
    }
};

describe('Helper: ', () => {
    it('getFormattedPrice should transform number 40 to $40.00', () => {
        expect(getFormattedPrice(40)).toBe('$40.00');
    });
    
    it('getPrettyTitleURL should replace spaces with dashes', () => {
        expect(getPrettyTitleURL('Blue Stripe Stoneware Plate')).toBe('Blue-Stripe-Stoneware-Plate');
    });
    
    it('getProductDetails should return a product or empty object', () => {
        expect(getProductDetails([])).toBeDefined();
    });
});

describe('Action creator:', () => {
    it('should return an object with type field', () => {
        expect(decreaseProductQuantityInCart()).toHaveProperty('type');
        expect(removeProductFromCart()).toHaveProperty('type');
        expect(hideAlert()).toHaveProperty('type');
        expect(openCartPopup()).toHaveProperty('type');
        expect(closeCartPopup()).toHaveProperty('type');
    });
});

it('reducer should always return a state object', () => {
    const initialStateMock = {
        ...stateMock,
        products: {},
        totalQuantity: 0,
        totalPrice: 0,
        alert: null,
        openPopup: null
    };

    expect(cartReducer(initialStateMock, actionMock)).toHaveProperty('products');
    expect(cartReducer(initialStateMock, actionMock)).toHaveProperty('totalQuantity');
    expect(cartReducer(initialStateMock, actionMock)).toHaveProperty('totalPrice');
    expect(cartReducer(initialStateMock, actionMock)).toHaveProperty('alert');
    expect(cartReducer(initialStateMock, actionMock)).toHaveProperty('openPopup');
});

describe('Add product to the cart:', () => {
    const state = {
        products: {},
        totalQuantity: 0,
        totalPrice: 0,
        alert: null,
        openPopup: null
    };
    const action = {
        ...actionMock,
        type: ADD_PRODUCT_TO_CART
    };

    const state1 = {...state, totalQuantity: 19};
    const action1 = {...action};
    action1.payload.quantity = 2;
    const updatedState1 = cartReducer(state1, action1);

    it('if total products quantity in cart will exceed max limit - product is not added and alert is displayed', () => {
        expect(updatedState1.totalQuantity).toBeLessThanOrEqual(TOTAL_MAX_QUANTITY_IN_CART);
        expect(updatedState1.alert).toBe(TOTAL_MAX_QUANTITY_ALERT);
    });

    const state2 = {...state};
    const action2 = {...action};
    action2.payload.quantity = 6;
    const updatedState2 = cartReducer(state2, action2);

    it('if product quantity in cart will exceed max limit per one product - product is not added and alert is displayed', () => {
        expect(updatedState2.products[action2.payload.product.id]).not.toBeDefined();
        expect(updatedState2.alert).toBe(ONE_PRODUCT_MAX_QUANTITY_ALERT);
    });
});

describe('Remove product from the cart should lead to:', () => {
    const state = {...stateMock};
    const action = {
        ...actionMock,
        type: REMOVE_PRODUCT_FROM_CART
    };

    const updatedState = cartReducer(state, action);
    const { products: updatedProducts,
            totalQuantity: updatedTotalQuantity,
            totalPrice: updatedTotalPrice } = updatedState;

    it('remove product id field from cart products object', () => {
        expect(updatedProducts).not.toHaveProperty([action.payload.product.id]);
    });

    it('reduce total products quantity by quantity of removed product', () => {
        expect(updatedTotalQuantity).toEqual(state.totalQuantity - action.payload.quantity);
    });

    it('reduce total price by total price of removed product', () => {
        expect(updatedTotalPrice).toEqual(state.totalPrice - action.payload.product.price * action.payload.quantity);
    });
});

describe('Decrease a product quantity in the cart should lead to:', () => {
    const state = {...stateMock};
    const action = {
        ...actionMock,
        type: DECREASE_PRODUCT_QUANTITY_IN_CART
    };

    const updatedState = cartReducer(state, action);
    const { id: productID, price: productPrice } = action.payload.product;
    const { totalQuantity: initialTotalQuantity,
            totalPrice: initialTotalPrice } = state;
    const { totalQuantity: updatedTotalQuantity,
            totalPrice: updatedTotalPrice } = updatedState;
    const initialProductQuantity = state.products[productID].quantity;
    const updatedProductQuantity = updatedState.products[productID].quantity;

    it('decrease a product quantity by 1', () => {
        expect(updatedProductQuantity).toEqual(initialProductQuantity - 1);
    });

    it('decrease total products quantity by 1', () => {
        expect(updatedTotalQuantity).toEqual(initialTotalQuantity - 1);
    });

    it('decrease total price by product price', () => {
        expect(updatedTotalPrice).toEqual(initialTotalPrice - productPrice);
    });
});

describe('App component renders:', () => {
    it('correctly without products', () => {
        const mockStore = configureStore();
        const store = mockStore({
            allProducts: [],
            cart: stateMock
        });

        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
