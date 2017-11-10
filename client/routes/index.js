import React from 'react';
import _ from 'lodash';
import { Route, Switch } from 'react-router';
import NotFound from '../pages/Not-Found';

const req = require.context('./', true, /^\.\/.*\.js$/);
const routesSettings = req.keys();

const applicationRoutes = _.reduce(routesSettings, (result, file) => {
    if (file !== './index.js' && file !== __filename) {
        const routeSettings = req(file).default;

        if (_.isArray(routeSettings)) {
            result = result.concat(routeSettings);
        } else {
            result.push(routesSettings);
        }
    }

    return result;
}, []);

export default (
  <Switch>
    {
      applicationRoutes.map(r => {
        return (
          <Route key={r.id} path={r.path} exact={r.exact} component={ r.component } />
        );
      })
    }
    <Route key='not-found' component={NotFound} />
  </Switch>
);




