import {combineReducers} from 'redux';

import SocketReducer from './socket-reducer';
import GameReducer from './game-reducer';

const allReducers = combineReducers({
    socketStore: SocketReducer,
    gameStore: GameReducer,
    questionStore: QuestionStore,
});

export default allReducers