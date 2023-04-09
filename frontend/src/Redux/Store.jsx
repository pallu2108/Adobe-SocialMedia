import {
    legacy_createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from "redux";
import { reducer as AuthReducer } from "./Auth/reducer";
import thunk from "redux-thunk";
import { reducer as AppReducer } from "./App/reducer";

const rootReducer = combineReducers({
    AppReducer, AuthReducer
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk))
);

export { store };