import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from './App';
import * as helpers from './helpers';
import * as actionCreators from './redux/actionCreators';
import * as actionTypes from './redux/actionTypes';
import { cartReducer } from './redux/reducers/cartReducer';
import * as constant from './constants';

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
        expect(helpers.getFormattedPrice(40)).toBe('$40.00');
    });

    it('getPrettyTitleURL should replace spaces with dashes', () => {
        expect(helpers.getPrettyTitleURL('Blue Stripe Stoneware Plate')).toBe('Blue-Stripe-Stoneware-Plate');
    });

    it('getProductDetails should return a product or empty object', () => {
        expect(helpers.getProductDetails([])).toBeDefined();
    });
});

describe('Action creator:', () => {
    const product = { id: 1000003, price: 40, title: 'MASHIKO' };
    const action = {
        type: actionTypes.DECREASE_PRODUCT_QUANTITY_IN_CART,
        payload: { product, quantity: 1 }
    }

    it('should return an action object', () => {
        expect(actionCreators.decreaseProductQuantityInCart(product)).toStrictEqual(action);
    });

    it('should return an object with type field', () => {
        expect(actionCreators.decreaseProductQuantityInCart()).toHaveProperty('type');
        expect(actionCreators.removeProductFromCart()).toHaveProperty('type');
        expect(actionCreators.hideAlert()).toHaveProperty('type');
        expect(actionCreators.openCartPopup()).toHaveProperty('type');
        expect(actionCreators.closeCartPopup()).toHaveProperty('type');
    });
});

describe('Reducer:', () => {
    it('should always return a state object', () => {
        const initialStateMock = {
            products: {},
            totalQuantity: 0,
            totalPrice: 0,
            alert: null,
            openPopup: null
        };
        const actionMock = {type: 'SOME_NON_EXISTENT_TYPE'};
        expect(cartReducer(initialStateMock, actionMock)).toEqual(initialStateMock);
    });
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
        type: actionTypes.ADD_PRODUCT_TO_CART
    };

    const state1 = { ...state, totalQuantity: 19 };
    const action1 = { ...action };
    action1.payload.quantity = 2;
    const updatedState1 = cartReducer(state1, action1);

    it('if total products quantity in cart will exceed max limit - product is not added and alert is displayed', () => {
        expect(updatedState1.totalQuantity).toBeLessThanOrEqual(constant.TOTAL_MAX_QUANTITY_IN_CART);
        expect(updatedState1.alert).toBe(constant.TOTAL_MAX_QUANTITY_ALERT);
    });

    const state2 = { ...state };
    const action2 = { ...action };
    action2.payload.quantity = 6;
    const updatedState2 = cartReducer(state2, action2);

    it('if product quantity in cart will exceed max limit per one product - product is not added and alert is displayed', () => {
        expect(updatedState2.products[action2.payload.product.id]).not.toBeDefined();
        expect(updatedState2.alert).toBe(constant.ONE_PRODUCT_MAX_QUANTITY_ALERT);
    });
});

describe('Remove product from the cart should lead to:', () => {
    let state, action, updatedState;

    beforeEach(() => {
        state = {
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

        action = {
            type: actionTypes.REMOVE_PRODUCT_FROM_CART,
            payload: {
                product: { id: 1000003, price: 40, title: 'MASHIKO' },
                quantity: 3
            }
        };

        updatedState = cartReducer(state, action);
    });

    it('remove product id field from cart products object', () => {
        expect(updatedState.products).not.toHaveProperty([action.payload.product.id]);
    });

    it('reduce total products quantity by quantity of removed product', () => {
        expect(updatedState.totalQuantity).toEqual(state.totalQuantity - action.payload.quantity);
    });

    it('reduce total price by total price of removed product', () => {
        expect(updatedState.totalPrice).toEqual(state.totalPrice - action.payload.product.price * action.payload.quantity);
    });
});

describe('Decrease a product quantity in the cart should lead to:', () => {
    let state, action, updatedState;

    beforeEach(() => {
        state = {
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

        action = {
            type: actionTypes.DECREASE_PRODUCT_QUANTITY_IN_CART,
            payload: {
                product: { id: 1000003, price: 40, title: 'MASHIKO' },
                quantity: 3
            }
        };

        updatedState = cartReducer(state, action);
    });

    it('decrease a product quantity by 1', () => {
        expect(updatedState.products['1000003'].quantity).toEqual(2);
    });

    it('decrease total products quantity by 1', () => {
        expect(updatedState.totalQuantity).toEqual(4);
    });

    it('decrease total price by product price', () => {
        expect(updatedState.totalPrice).toEqual(220 - 40);
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

describe('Fetch products:', () => {
    const mockProducts = [
        { id: 1000001, price: 40, title: 'MASHIKO' },
        { id: 1000002, price: 60, title: 'HEME' },
    ];

    const action = {
        type: actionTypes.FETCH_PRODUCTS,
        payload: { allProducts: mockProducts }
    };

    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('should return an action object with products', async () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: () => new Promise((resolve, reject) => {
                resolve({
                    allProducts: mockProducts
                })
            })
        }))

        const store = mockStore({});

        await store.dispatch(actionCreators.fetchProducts());
        const actions = store.getActions();

        expect(actions[0]).toEqual(action);
    });
});
