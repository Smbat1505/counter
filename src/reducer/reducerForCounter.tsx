type InitialStateType = {
    count: number;
    maxValue: number;
    startValue: number;
}
// Исходное состояние (initial state)
const initialState: InitialStateType = {
    count: 0,
    maxValue: 7,
    startValue: 0,
};

export const reducerForCounter = (state = initialState, action: RootACType): InitialStateType => {
    switch (action.type) {
        case "INCREMENT": {
            if (state.count < state.maxValue) return {...state, count: state.count + 1};
            return state
        }

        case "RESET": {
            return {...state, count: state.startValue}
        }

        case "MAX_VALUE_CHANGE": {
            const {maxValue} = action.payload
            return {...state, maxValue}
        }

        case "START_VALUE_CHANGE": {
            const {startValue} = action.payload
            return {...state, startValue}
        }

        default:
            return state
    }
}


export type RootACType = IncrementACType | ResetACType | MaxValueChangeACType | StartValueChangeACType;


type IncrementACType = ReturnType<typeof IncrementAC>
export const IncrementAC = () => {
    return {
        type: 'INCREMENT',
        payload: {}
    } as const
}

type ResetACType = ReturnType<typeof ResetAC>
export const ResetAC = () => {
    return {
        type: 'RESET',
        payload: {}
    } as const
}


type MaxValueChangeACType = ReturnType<typeof MaxValueChangeAC>
export const MaxValueChangeAC = (maxValue: number) => {
    return {
        type: 'MAX_VALUE_CHANGE',
        payload: {
            maxValue
        }
    } as const
}

type StartValueChangeACType = ReturnType<typeof StartValueChangeAC>
export const StartValueChangeAC = (startValue: number) => {
    return {
        type: 'START_VALUE_CHANGE',
        payload: {
            startValue
        }
    } as const
}

