import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import * as serviceWorker from 'serviceWorker';
import configureStore from 'redux/store';
import theme from 'theme';
import MainContainer from 'Components/container/MainContainer';

import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <MainContainer />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
