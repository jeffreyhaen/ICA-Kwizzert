import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import kwizmeestertStore from './stores/kwizmeestertStore';

import Home from './containers/home';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={kwizmeestertStore}>
       <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/home" component={Home} />
                { /*
                <Route path="/timeline" component={Timeline} />
                <Route path="/profile/:userId" component={Profile} />
                <Route path="/newPost" component={NewPost} />
                <Route path="/logout" component={Login} /> */ }
            </Route>
        </Router>
  </Provider>,
  document.getElementById('root')
);

