import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { fetchProducts } from './redux/actionCreators';
import './index.css';
import App from './App';

// Fetch initial data on page load
store.dispatch(fetchProducts());

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
