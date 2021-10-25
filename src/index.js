import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwtDecode from "jwt-decode"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from  "./store"
import App from './components/App';
import setValidationToken from "./utils/validation/setValidationToken"
import {setCurrentUser} from "./store/actions/LogInAction"

setValidationToken(localStorage.getItem("jwtToken"))
if(localStorage.jwtToken){
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
</Provider>,
document.getElementById('root')
);

