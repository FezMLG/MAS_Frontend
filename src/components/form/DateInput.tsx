import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type DateInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  defaultValue?: Date;
  maxDate?: Date;
};

export const DateInput = <T extends FieldValues>(
  inputProps: DateInputProps<T>,
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
        type="date"
        max={inputProps.maxDate?.toISOString().split('T')[0]}
        className={'border-2 rounded-md p-2 cursor-pointer'}
        defaultValue={inputProps.defaultValue?.toISOString().split('T')[0]}
      />
    </div>
  );
};
