import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
const app = <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>

if (rootElement.hasChildNodes()) {
    hydrate(app, rootElement);
} else {
    render(app, rootElement);
}
