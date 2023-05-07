import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger))
);

export default store;