import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { store } from './redux/store';
import { fetchProducts } from './redux/actionCreators';
import logo from './logo.png';
import Category from "./category/Category";
import Cart from "./cart/Cart";
import Product from "./product/Product";
import CartPopup from './cartPopup/CartPopup';
import './App.scss';

class App extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        store.dispatch(fetchProducts());
    }

    render() {
        return (
            <div className={`App${this.props.openPopup ? ' cartPopup-opened' : ''}`}
                data-testid="app-container">
                <header className="App-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-2">
                                <img src={logo} className="App-header-logo" alt="logo" />
                            </div>
                            <div className="col-8">
                                <nav className="App-header-nav">
                                    <ul className="App-header-nav--list">
                                        <li><Link to="/">HOME</Link></li>
                                        <li><a href="#">SHOP</a></li>
                                        <li><a href="#">JOURNAL</a></li>
                                        <li><a href="#">MORE</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-2">
                                <CartPopup />
                            </div>
                        </div>
                    </div>
                </header>

                <Route exact path="/" component={Category} />
                <Route path="/cart" component={Cart} />
                <Route path="/product/:id/:title" component={Product} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        openPopup: state.cart.openPopup
    };
};

export default connect(mapStateToProps)(App)
