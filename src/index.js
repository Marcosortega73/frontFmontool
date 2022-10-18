import React from 'react';
import ReactDOM from 'react-dom/client';

import {Provider} from 'react-redux';
import store from './redux/store';

//Temas Styles

import theme from './styles/themes/themeConfig';

import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';

import './index.css';

//Vistas Generales
import AppRouter from './routes/AppRouter';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
    </Provider>

);