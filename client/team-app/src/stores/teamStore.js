import { createStore } from 'redux';
import allReducers from '../reducers';

const teamStore = createStore(
    allReducers
);

export default teamStore;