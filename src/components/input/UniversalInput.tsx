import React, { InputHTMLAttributes, ReactNode } from 'react';

type UniversalInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    children?: ReactNode;
    // Добавьте любые дополнительные свойства или опции настраиваемого ввода здесь
};

export const UniversalInput: React.FC<UniversalInputProps> = ({ label, children, ...props }) => {
    return (
        <div>
            {label && <label htmlFor={props.id}>{label}</label>}
            <input {...props} />
            {children}
        </div>
    );
};
