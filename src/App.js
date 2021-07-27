import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {keepLogin, cookieChecked} from './actions';
import Header from './components/others/Header'
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import History from './components/History';


class App extends Component {

  render() {

      return (
        <div>
            <Header navBrand={"Arvis"}/>
            <div>
              <Route exact path="/" component={ProductList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/detailproduct" component={ProductDetail} />
              <Route path="/cart" component={Cart} />
              <Route path="/history" component={History} />
            </div>
        </div>
      );
  }
}

export default App;
