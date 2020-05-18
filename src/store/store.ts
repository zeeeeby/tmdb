import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Action,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import authReducer from '../store/modules/auth';
import { localStorage } from '@src/lib/local-storage';
import {actions as authActions} from "@src/store/modules/auth"
let rootReducer = combineReducers({
  auth: authReducer,
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

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;

// сделать авообновление, проверку, подгрузку в стор токена
const session_id: string = localStorage.load('session').session_id;

if(session_id) store.dispatch(authActions.setAuthStatus(true))
