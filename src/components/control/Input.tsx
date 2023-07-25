import React, {ChangeEvent, FC} from 'react';


type InputPropsType = {
    placeholder?: string,
    type?: string
    id: string,
    // onChange: (e: ChangeEvent<HTMLInputElement>)=>void,
    // setValue: (value: string) => void,
    // value?: number,
    minValue?: number,
    maxValue?: number
}
export const Input: FC<InputPropsType> = ({type, minValue, maxValue,  id,  placeholder}) => {

    return (
        <input placeholder={placeholder} id={id} type={type}   min={minValue} max={maxValue}/>
    )
}