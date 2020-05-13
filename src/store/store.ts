import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from '../store/modules/auth';

let rootReducer = combineReducers({
  auth: authReducer,
});

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
