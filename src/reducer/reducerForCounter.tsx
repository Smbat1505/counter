
export type countType = number
export type startValueType = number
export type maxValueType = number


export type InitialStateType = {
    count: countType;
    startValue: startValueType;
    maxValue: maxValueType;
}
// Исходное состояние (initial state)
const initialState: InitialStateType = {
    count: 0,
    maxValue: 7,
    startValue: 0,
};

export const reducerForCounter = (state = initialState, action: RootACType): InitialStateType => {
    switch (action.type) {
        case "INCREMENT_COUNTER": {
            if (state.count < state.maxValue) return {...state, count: state.count + 1};
            return state
        }

        case "RESET_COUNTER": {
            return {...state, count: state.startValue}
        }

        case "SET_MAX_VALUE": {
            const {maxValue} = action.payload
            return {...state, maxValue}
        }

        case "SET_START_VALUE": {
            const {startValue} = action.payload
            return {...state, startValue}
        }
        case 'SET_COUNT':
            const {count} = action.payload
            return {...state, count};
        case 'RESET_ALL':
            return initialState;

        default:
            return state
    }
}


export type RootACType =
    IncrementACType
    | ResetACType
    | MaxValueChangeACType
    | StartValueChangeACType
    | ResetAllACType
    | CountACType;


type IncrementACType = ReturnType<typeof IncrementAC>
export const IncrementAC = () => {
    return {
        type: 'INCREMENT_COUNTER',
        payload: {}
    } as const
}

type ResetACType = ReturnType<typeof ResetAC>
export const ResetAC = () => {
    return {
        type: 'RESET_COUNTER',
        payload: {}
    } as const
}


type MaxValueChangeACType = ReturnType<typeof MaxValueChangeAC>
export const MaxValueChangeAC = (maxValue: number) => {
    return {
        type: 'SET_MAX_VALUE',
        payload: {
            maxValue
        }
    } as const
}

type StartValueChangeACType = ReturnType<typeof StartValueChangeAC>
export const StartValueChangeAC = (startValue: number) => {
    return {
        type: 'SET_START_VALUE',
        payload: {
            startValue
        }
    } as const
}

type CountACType = ReturnType<typeof SetCountAC>
export const SetCountAC = (count: number) => {
    return {
        type: 'SET_COUNT',
        payload: {
            count
        }
    } as const
}

type ResetAllACType = ReturnType<typeof ResetAllAC>
export const ResetAllAC = () => {
    return {type: 'RESET_ALL'} as const
};
