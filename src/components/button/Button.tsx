import React, {ReactNode, ButtonHTMLAttributes, memo} from 'react';

type UniversalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    // Add any additional props or customization options here
};

export const Button: React.FC<UniversalButtonProps> = memo(({children, ...props}) => {
    console.log('rendered button')
    return (
        <button {...props}>
            {children}
        </button>
    );
});

