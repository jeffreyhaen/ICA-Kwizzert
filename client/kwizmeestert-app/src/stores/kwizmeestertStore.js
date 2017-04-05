import { createStore } from 'redux';
import allReducers from '../reducers';

const kwizmeestertStore = createStore(
    allReducers
);

export default kwizmeestertStore;