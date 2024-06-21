'use client';

import React from 'react';
import { BooksTableRow } from '@/components/table';
import { DateInput, TextInput } from '@/components/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetReader, usePostTask } from '@/api';
import { DepartmentAndEmployeeSelect } from '@/components/DepartmentAndEmployeeSelect';
import { useDepartmentStore } from '@/store';
import { fakerPL } from '@faker-js/faker';

type TaskFormInputs = {
  name: string;
  startDate: string;
  endDate: string;
};

export default function BorrowPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TaskFormInputs>();

  const store = useDepartmentStore(state => state);
  const createTask = usePostTask();

  const onSubmit: SubmitHandler<TaskFormInputs> = async data => {
    if (
      store.getSelectedEmployee() === null &&
      store.getSelectedDepartment() === null
    ) {
      return;
    }

    createTask.mutate({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
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
          <h1 className="text-3xl font-extralight">Dodaj nowe zadanie</h1>
        </button>
        <div className="bg-white rounded-md px-8 py-4 shadow-md">
          <DepartmentAndEmployeeSelect />
          {store.getSelectedEmployeeProject() &&
          store.getSelectedEmployeeProject()?.projectId !== null ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-4 my-8">
              <TextInput
                label={'Nazwa'}
                register={register}
                name="name"
                required
              />
              <DateInput
                label={'Start'}
                name={'startDate'}
                register={register}
                defaultValue={new Date()}
                required
              />
              <DateInput
                label={'Koniec'}
                name={'endDate'}
                register={register}
              />
              <button
                type="submit"
                disabled={
                  createTask.isPending ||
                  store.getSelectedEmployee() === null ||
                  store.getSelectedDepartment() === null
                }
                className="px-8 py-2 border-2 rounded-md bg-cyan-100 border-sky-800 hover:bg-cyan-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed">
                Dodaj
              </button>
              {errors.name && (
                <span className="text-red-700">Nazwa jest wymagana</span>
              )}
              {createTask.isSuccess && (
                <span className="text-green-700">Zadanie dodane</span>
              )}
              {createTask.isError && (
                <span className="text-red-700">
                  Błąd przy dodawaniu zadania
                </span>
              )}
            </form>
          ) : (
            <div className="mt-4">
              {store.getSelectedEmployeeProject()?.projectId === null && (
                <p className="text-red-700">
                  Pracownik nie posiada przypisanego projektu
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
