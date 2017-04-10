import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import kwizmeestertStore from './stores/kwizmeestertStore';

import GameOverviewContainer from './containers/game/overview-container';
import GameDetailContainer from './containers/game/detail-container';
import GameChooseCategories from './containers/game/chooseCategories-container';
import RoundChooseQuestion from './containers/round/chooseQuestion-container';
import RoundRateTeamAnswers from './containers/round/rateTeamAnswers-container';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={kwizmeestertStore}>
       <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={GameOverviewContainer} />
                <Route path="/games" component={GameOverviewContainer} />
                <Route path="/game/:gameId" component={GameDetailContainer} />
                <Route path="/chooseCategories" component={GameChooseCategories} />
                <Route path="/chooseQuestion" component={RoundChooseQuestion} />
                <Route path="/rateTeamAnswers" component={RoundRateTeamAnswers} />
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

