import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import teamStore from './stores/teamStore.js';

import GameRegisterContainer from './containers/game/registerTeam-container';
import GameOverviewContainer from './containers/game/overview-container';
import AnswerContainer from './containers/question/answer-container';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={teamStore}>
       <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={GameOverviewContainer} />
                <Route path="/register" component={GameRegisterContainer} />
                <Route path="/question" component={AnswerContainer} />
            </Route>
        </Router>
  </Provider>,
  document.getElementById('root')
);

