import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import Category from "./category/Category";
import Cart from "./cart/Cart";
import Product from "./product/Product";
import CartPopup from './cartPopup/CartPopup';
import './App.css';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={`App${this.props.openPopup ? ' cartPopup-opened' : ''}`}>
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Storefront Assignment</h1>
                </header>
                <p className="App-intro">
                    To get started, delete this header and introduction, and begin building your app in the provided components.
        </p>
                <p className="App-intro">
                    We've setup the bare minimum you need to get started, but feel free to add as many components as you see fit.
        </p> */}

                <CartPopup />

                <Route exact path="/" component={Category} />
                <Route path="/cart" component={Cart} />
                <Route path="/product/:id/:title" component={Product} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        openPopup: state.cart.openPopup
    };
};

export default connect(mapStateToProps)(App);
