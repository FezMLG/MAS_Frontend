import React from 'react';

type SelectProps = {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  children?: React.ReactNode;
  emptyOption?: string;
};

export const Select = ({
  label,
  name,
  register,
  required,
  children,
  emptyOption,
}: SelectProps) => {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor="department">
        {label} {required ?? '(opcjonalne)'}
      </label>
      <select
        id="department"
        name="department0"
        className="border-2 rounded-md p-2 min-w-36 cursor-pointer disabled:cursor-not-allowed"
        {...register(name, {
          required,
        })}>
        <option defaultChecked value={''}>
          {emptyOption ?? 'Select'}
        </option>
        {children}
      </select>
    </div>
  );
};
