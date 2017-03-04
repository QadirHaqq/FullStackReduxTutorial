import makeStore from './src/store';
import startServer from './src/server';
import { SET_ENTRIES, NEXT } from './src/reducer';

export const store = makeStore();
startServer(store);

store.dispatch({
    type: SET_ENTRIES,
    entries: require('./entries.json')
});
store.dispatch({type: NEXT});
