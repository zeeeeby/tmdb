import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Action,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { authReducer } from './modules/auth';
import { accountReducer } from './modules/account';
import { moviesReducer } from './modules/movies';
let rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  movies: moviesReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
