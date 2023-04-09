import {
    legacy_createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from "redux";
import thunk from "redux-thunk";
import { reducer as AppReducer } from "./App/reducer";

const rootReducer = combineReducers({
    AppReducer
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk))
);

export { store };