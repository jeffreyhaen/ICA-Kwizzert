import { createStore } from 'redux';
import allReducers from '../reducers';

const scoreboardStore = createStore(
    allReducers
);

export default scoreboardStore;