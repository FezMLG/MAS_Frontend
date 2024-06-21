import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  type?: 'text' | 'password' | 'email';
};

export const TextInput = <T extends FieldValues>(
  inputProps: TextInputProps<T>,
) => {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor={inputProps.name}>
        {inputProps.label} {inputProps.required ?? '(opcjonalne)'}
      </label>
      <input
        {...inputProps.register(inputProps.name, {
          required: inputProps.required,
        })}
        type={inputProps.type ?? 'text'}
        className={'border-2 rounded-md p-2 w-64'}
      />
    </div>
  );
};
