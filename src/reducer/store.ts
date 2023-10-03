import {createStore, applyMiddleware} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk'; // Изменил импорт thunk и ThunkMiddleware
import {reducerForCounter, RootACType} from "./reducerForCounter";

const store = createStore(
    reducerForCounter,
    applyMiddleware(thunk as ThunkMiddleware<AppRootStateType, RootACType>)
);

export default store;

export type AppRootStateType = ReturnType<typeof reducerForCounter>; // Определение типа RootState

// Оставьте это, если оно необходимо для вашей отладки
if (process.env.NODE_ENV === 'development') {
    (window as any).__store__ = store;
}
