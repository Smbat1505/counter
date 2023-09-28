import {combineReducers, legacy_createStore} from "redux";
import {reducerForCounter} from "./reducerForCounter";

export const rootReducer = combineReducers({
    counter: reducerForCounter
})
export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store