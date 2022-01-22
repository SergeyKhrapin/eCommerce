import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import * as helpers from './helpers';
import * as actionCreators from './redux/actionCreators';
import * as actionTypes from './redux/actionTypes';
import * as reducer from './redux/reducers/cartReducer';
import * as constant from './constants';
import puppeteer from 'puppeteer';

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
        const actionMock = { type: 'SOME_NON_EXISTENT_TYPE' };
        expect(reducer.cartReducer(initialStateMock, actionMock)).toEqual(initialStateMock);
    });
});

describe('Add product to the cart:', () => {
    let state, action;

    beforeEach(() => {
        state = {
            products: {},
            totalQuantity: 0,
            totalPrice: 0,
            alert: null,
            openPopup: null
        };
        action = {
            type: actionTypes.ADD_PRODUCT_TO_CART,
            payload: {
                product: { id: 1000003, price: 40, title: 'MASHIKO' },
                quantity: 0
            }
        };
    });

    it('if total products quantity in cart will exceed max limit - product is not added and alert is displayed', () => {
        state.totalQuantity = 19;
        action.payload.quantity = 2;
        const updatedState = reducer.cartReducer(state, action);
        expect(updatedState.totalQuantity).toBeLessThanOrEqual(constant.TOTAL_MAX_QUANTITY_IN_CART);
        expect(updatedState.alert).toBe(constant.TOTAL_MAX_QUANTITY_ALERT);
    });

    it('if product quantity in cart will exceed max limit per one product - product is not added and alert is displayed', () => {
        action.payload.quantity = 6;
        const updatedState = reducer.cartReducer(state, action);
        expect(updatedState.products['1000003']).not.toBeDefined();
        expect(updatedState.alert).toBe(constant.ONE_PRODUCT_MAX_QUANTITY_ALERT);
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

        updatedState = reducer.cartReducer(state, action);
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

        updatedState = reducer.cartReducer(state, action);
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

// describe('App component renders:', () => {
//     it('correctly without products', () => {
//         const mockStore = configureStore();
//         const store = mockStore({
//             allProducts: [],
//             cart: {
//                 products: {
//                     1000001: {
//                         product: { id: 1000001, price: 50, title: "Heme" },
//                         quantity: 2
//                     },
//                     1000003: {
//                         product: { id: 1000003, price: 40, title: 'MASHIKO' },
//                         quantity: 3
//                     }
//                 },
//                 totalQuantity: 5,
//                 totalPrice: 220,
//                 alert: null,
//                 openPopup: null
//             }
//         });

//         const component = renderer.create(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <App />
//                 </BrowserRouter>
//             </Provider>
//         );

//         let tree = component.toJSON();
//         expect(tree).toMatchSnapshot();
//     });
// });

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

// describe('Add product to cart:', () => {
//     let store, state, product, action;

//     beforeEach(() => {
//         const middlewares = [thunk];
//         const mockStore = configureStore(middlewares);
//         store = mockStore({});

//         state = {
//             products: {},
//             totalQuantity: 0,
//             totalPrice: 0,
//             alert: null,
//             openPopup: null
//         };

//         product = { id: '1000001', price: 40, title: 'MASHIKO' };

//         action = {
//             type: actionTypes.ADD_PRODUCT_TO_CART,
//             payload: {
//                 product: product,
//                 quantity: 1
//             }
//         };
//     });

//     it('call addProductToCart and setTimeout inside it', () => {
//         jest.useFakeTimers();
//         store.dispatch(actionCreators.addProductToCart(product, 1));
//         expect(setTimeout).toHaveBeenCalled();
//         expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), constant.ALERT_HIDE_DELAY);
//     });

//     it('should return an action object with that product', async () => {
//         const spy = jest.spyOn(actionCreators, 'addProductToCart');
//         await store.dispatch(actionCreators.addProductToCart(product, 1));
//         const actions = store.getActions();

//         expect(actions[0]).toEqual(action);
//         expect(spy).toHaveBeenCalled();
//     });
// });

// describe('When cart popup is opened:', () => {
//     beforeEach(() => {
//         const mockStore = configureStore();

//         const store = mockStore({
//             allProducts: [],
//             cart: {
//                 products: {},
//                 openPopup: true
//             }
//         });

//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <App />
//                 </BrowserRouter>
//             </Provider>
//         );
//     });

//     it('App container has a corresponding class', () => {
//         const app = screen.getByTestId('app-container');
//         expect(app).toHaveClass('cartPopup-opened');
//     });

//     it('cart popup container and overlay are displayed in DOM', () => {
//         const cartPopup = screen.getByTestId('cart-popup');
//         const cartPopupClose = screen.getByTestId('cart-popup-close');
//         expect(cartPopup).toBeInTheDocument();
//         expect(cartPopupClose).toBeInTheDocument();
//     });

//     it('open cart popup link has aria-expanded=true', () => {
//         const cartPopupOpenLink = screen.getByTestId('cart-popup-open-link');
//         expect(cartPopupOpenLink).toHaveAttribute('aria-expanded', 'true');
//     });
// });

/* ================
    e2e tests
=================== */

test('Homepage is loaded successfully', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1530,800'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');

	// add 2 products to cart
	await page.hover('#productTile-1000001');
	await page.click('#product-1000001');
	await page.waitForTimeout(1000);
	await page.hover('#productTile-1000002');
	await page.click('#product-1000002');
	
	// open cart popup
	await page.evaluateHandle(() => {
		document.querySelector('[data-testid="cart-popup-open-link"]').click();
	})

	// check if cart popup is really opened
	const isPopupOpened = await page.$$eval('[data-testid="cart-popup"]', items => {
		// return item; Known issue - puppeteer returns undefined!
		return items.length;
	})
	expect(isPopupOpened).toEqual(1);

	// check the amount of items in the cart
	const itemsInCart = await page.$$eval('[data-testid="cart-popup-item"]', items => items.length)
	// TODO: this fails sometimes when tests run for the first time!
	expect(itemsInCart).toEqual(2);

	// await browser.close();
}, 100000)
