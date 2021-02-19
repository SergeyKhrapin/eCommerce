import { combineReducers } from 'redux'
import { productsReducer, cartReducer } from './productsReducer'

export const rootReducer = combineReducers({
    allProducts: productsReducer,
    productsInCart: cartReducer
})
