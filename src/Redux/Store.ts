import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { catsReducer } from "./CatsState";

// Single Reducer
// const store = createStore(catsReducer);

// For getting data
// const xys = store.getState().cats;

// Multiple catsReducer
const reducers = combineReducers({catState: catsReducer, authState: authReducer});
const store = createStore(reducers)

// For getting data
// const xyz = store.getState().catState.cats;

export default store;