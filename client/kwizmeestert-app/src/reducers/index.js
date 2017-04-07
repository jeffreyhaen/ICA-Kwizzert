import {combineReducers} from 'redux';

import SocketReducer from './socket-reducer';
import GameReducer from './game-reducer';
import CategoryReducer from './category-reducer';
import RoundReducer from './round-reducer';

const allReducers = combineReducers({
    socketStore: SocketReducer,
    gameStore: GameReducer,
    categoryStore: CategoryReducer,
    roundStore: RoundReducer,
});

export default allReducers