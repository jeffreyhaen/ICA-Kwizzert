import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import kwizmeestertStore from './stores/kwizmeestertStore';

import GameContainer from './containers/game-container';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={kwizmeestertStore}>
       <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={GameContainer} />
                <Route path="/game" component={GameContainer} />
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

