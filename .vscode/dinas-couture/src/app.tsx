import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './styles/globals.css';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/product/:id" component={Product} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;