import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import scoreboardStore from './stores/scoreboardStore';

import GameOverviewContainer from './containers/gameOverview-container';
import GameScoreboardContainer from './containers/gameScoreboard-container';
import GameEndedContainer from './containers/gameEnded-container';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={scoreboardStore}>
       <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={GameOverviewContainer} />
                <Route path="/games" component={GameOverviewContainer} />
                <Route path="/scoreboard" component={GameScoreboardContainer} />
                <Route path="/end" component={GameEndedContainer} />
            </Route>
        </Router>
  </Provider>,
  document.getElementById('root')
);

