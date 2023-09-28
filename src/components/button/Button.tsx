import React, {ReactNode, ButtonHTMLAttributes} from 'react';

type UniversalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    // Add any additional props or customization options here
};

export const Button: React.FC<UniversalButtonProps> = ({children, ...props}) => {
    return (
        <button {...props}>
            {children}
        </button>
    );
};

