import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import rootReducer from "./redux/reducers/index"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {Toaster, toast} from "sonner"

const store = configureStore({
   reducer : rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <BrowserRouter>
            {/* <React.StrictMode> */}
              <Toaster position="top-center" richColors/>
              <App />
            {/* </React.StrictMode> */}
      </BrowserRouter>
  </Provider>
  
);


