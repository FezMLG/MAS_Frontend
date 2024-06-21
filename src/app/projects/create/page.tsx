'use client';

import React from 'react';
import { BooksTableRow } from '@/components/table';
import { DateInput, TextInput } from '@/components/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useGetDepartments,
  useGetReader,
  usePostDepartment,
  usePostProject,
  usePostTask,
} from '@/api';
import { DepartmentAndEmployeeSelect } from '@/components/DepartmentAndEmployeeSelect';
import { useDepartmentStore } from '@/store';
import { fakerPL } from '@faker-js/faker';

type ProjectFormInput = {
  name: string;
};

export default function CreateProjectPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProjectFormInput>();

  const createProject = usePostProject();

  const onSubmit: SubmitHandler<ProjectFormInput> = async data => {
    createProject.mutate({
      name: data.name,
    });

    reset();
  };

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-screen-lg w-full gap-4 flex flex-col mt-8">
        <button
          onClick={() => {
            setValue('name', fakerPL.commerce.productName());
          }}>
          <h1 className="text-3xl font-extralight">Dodaj nowy projekt</h1>
        </button>
        <div className="bg-white rounded-md px-8 py-4 shadow-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-4 my-8">
            <TextInput
              label={'Nazwa'}
              register={register}
              name="name"
              required
            />
            <button
              type="submit"
              disabled={createProject.isPending || watch('name') === ''}
              className="px-8 py-2 border-2 rounded-md bg-cyan-100 border-sky-800 hover:bg-cyan-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed">
              Dodaj
            </button>
            {errors.name && (
              <span className="text-red-700">Nazwa jest wymagana</span>
            )}
            {createProject.isSuccess && (
              <span className="text-green-700">Projekt dodany</span>
            )}
            {createProject.isError && (
              <span className="text-red-700">Błąd przy dodawaniu projektu</span>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
