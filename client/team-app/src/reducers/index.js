import {combineReducers} from 'redux';

import SocketReducer from './socket-reducer';
import GameReducer from './game-reducer';
import RoundReducer from './round-reducer';
import TeamReducer from './team-reducer';

const allReducers = combineReducers({
    socketStore: SocketReducer,
    gameStore: GameReducer,
    teamStore: TeamReducer,
    roundStore: RoundReducer,
});

export default allReducers