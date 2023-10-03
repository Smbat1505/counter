import {
    reducerForCounter,
    IncrementAC,
    ResetAC,
    MaxValueChangeAC,
    StartValueChangeAC,
    ResetAllAC,
} from './reducerForCounter'; // Замените 'yourReducerFile' на путь к вашему файлу с редюсером

describe('Counter Reducer', () => {
    const initialState = {
        count: 0,
        maxValue: 7,
        startValue: 0,
    };

    it('should increment count when INCREMENT_COUNTER action is dispatched', () => {
        const newState = reducerForCounter(initialState, IncrementAC());
        expect(newState.count).toBe(1);
    });

    it('should reset count when RESET_COUNTER action is dispatched', () => {
        const state = {...initialState, count: 5};
        const newState = reducerForCounter(state, ResetAC());
        expect(newState.count).toBe(initialState.startValue);
    });

    it('should set max value when SET_MAX_VALUE action is dispatched', () => {
        const newMaxValue = 10;
        const newState = reducerForCounter(initialState, MaxValueChangeAC(newMaxValue));
        expect(newState.maxValue).toBe(newMaxValue);
    });

    it('should set start value when SET_START_VALUE action is dispatched', () => {
        const newStartValue = 2;
        const newState = reducerForCounter(initialState, StartValueChangeAC(newStartValue));
        expect(newState.startValue).toBe(newStartValue);
    });

    it('should reset to initial state when RESET_ALL action is dispatched', () => {
        const state = {...initialState, count: 5, maxValue: 10, startValue: 2};
        const newState = reducerForCounter(state, ResetAllAC());
        expect(newState).toEqual(initialState);
    });
});
