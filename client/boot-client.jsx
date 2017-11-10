import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';

import configureStore from './store';
import routes from './routes';

import App from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import './assets/index.css';

const history = createBrowserHistory();
const store = configureStore(history, {});

const app = (
  <App>
    {routes}
  </App>
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history} children={app} />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
