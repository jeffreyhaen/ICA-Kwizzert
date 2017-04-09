import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import teamStore from './stores/teamStore.js';

import GameRegisterContainer from './containers/gameRegisterTeam-container';
import GameOverviewContainer from './containers/gameOverview-container';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={teamStore}>
       <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={GameOverviewContainer} />
                <Route path="/register" component={GameRegisterContainer} />
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

