// export const Button: React.FC<ButtonType> = ({type, name, className, callback}) => {
//     return (
//         <>
//             <button onClick={callback} type={type} className={className} >{name}</button>
//         </>
//     );
// };
//


import React, {FC} from 'react';

type ButtonType = {
    type: "button" | "submit" | "reset" | undefined,
    name: string,
    callback: () => void,
    disabled?: boolean
    className?: string
}

export const Button: FC<ButtonType> = ({type, name, callback, disabled, className}) => {
    const onClickButtonHandler = () => callback();
    return (
        <button className={className} disabled={disabled} type={type} onClick={onClickButtonHandler}>{name}</button>
    )
}