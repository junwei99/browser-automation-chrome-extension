import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled: boolean;
}

const Input: React.FC<IInputProps> = ({
  onChange,
  value,
  disabled,
  ...rest
}) => {
  return (
    <input
      {...rest}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
        rest?.className ?? ""
      }`}
      type="text"
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
};

export default Input;
