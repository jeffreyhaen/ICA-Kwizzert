import {combineReducers} from 'redux';

import SocketReducer from './socket-reducer';
import GameReducer from './game-reducers';

const allReducers = combineReducers({
    socketStore: SocketReducer,
    gameStore: GameReducer,
});

export default allReducers