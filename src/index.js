import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './supports/fontawesome-free/css/fontawesome.min.css'; 
import './supports/fontawesome-free/';
import './supports/css/style.css'
import './supports/css/agency.css';
import './supports/css/tabelproduct.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const store = createStore(reducers,{}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
