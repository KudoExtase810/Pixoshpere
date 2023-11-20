import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
}

const TextInput: React.FC<TextInputProps> = ({ labelText, ...props }) => {
    return (
        <label className="flex flex-col">
            <span className="text-sm text-neutral-700">{labelText}</span>
            <input
                {...props}
                className="mt-0.5 p-2 w-full appearance-none rounded-md border border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="text"
            />
        </label>
    );
};

export default TextInput;
