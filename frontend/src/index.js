import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyles.styles";
import { GlobalStyles } from "./GlobalStyles.styles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>

    //</React.StrictMode>
);


