import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import store from './store/store';
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  
  <AuthContextProvider>
    <Provider store={store}>
    <App />
    </Provider>
  </AuthContextProvider>,
  rootElement
  
);
