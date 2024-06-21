'use client';

import React from 'react';
import { BooksTableRow } from '@/components/table';
import { DateInput, Select, TextInput } from '@/components/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useGetDepartments,
  useGetReader,
  usePostDepartment,
  usePostTask,
} from '@/api';
import { DepartmentAndEmployeeSelect } from '@/components/DepartmentAndEmployeeSelect';
import { useDepartmentStore } from '@/store';
import { usePostEmployee } from '@/api/hooks/usePostEmployee';
import { useGetProjects } from '@/api/hooks/useGetProjects';
import { fakerPL } from '@faker-js/faker';

type DepartmentFormInput = {
  name: string;
  surname: string;
  email: string;
  birthDate: string | null;
  dateOfEmployment: string;
  departmentId: number;
  projectId: number | null;
};

export default function CreateEmployeePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DepartmentFormInput>();

  const createEmployee = usePostEmployee();
  const departments = useGetDepartments();
  const projects = useGetProjects();
  const store = useDepartmentStore(state => state);

  const onSubmit: SubmitHandler<DepartmentFormInput> = async data => {
    console.log(data);

    createEmployee.mutate(data);

    reset();
  };

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-screen-lg w-full gap-4 flex flex-col mt-8">
        <button
          onClick={() => {
            const firstName = fakerPL.person.firstName();
            const lastName = fakerPL.person.lastName();
            const email = fakerPL.internet.email({
              firstName,
              lastName,
            });
            const birthDate = fakerPL.date
              .past({ years: 30, refDate: '2000-01-01T00:00:00.000Z' })
              .toISOString()
              .split('T')[0];

            setValue('name', firstName);
            setValue('surname', lastName);
            setValue('email', email);
            setValue('birthDate', birthDate);
          }}>
          <h1 className="text-3xl font-extralight">Dodaj nowego pracownika</h1>
        </button>
        <div className="bg-white rounded-md px-8 py-4 shadow-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-4 my-8">
            <TextInput
              label={'Imię'}
              register={register}
              name="name"
              required
            />
            {errors.name && (
              <span className="text-red-700">Nazwa jest wymagana</span>
            )}
            <TextInput
              label={'Nazwisko'}
              register={register}
              name="surname"
              required
            />
            {errors.surname && (
              <span className="text-red-700">Nazwisko jest wymagane</span>
            )}
            <TextInput
              label={'Email'}
              register={register}
              name="email"
              type="email"
              required
            />
            {errors.email && (
              <span className="text-red-700">Email jest wymagany</span>
            )}
            <DateInput
              label={'Data urodzenia'}
              name={'birthDate'}
              register={register}
              required
              maxDate={new Date()}
            />
            {errors.birthDate && (
              <span className="text-red-700">Data urodzenia jest wymagana</span>
            )}
            <DateInput
              label={'Data zatrudnienia'}
              name={'dateOfEmployment'}
              register={register}
              defaultValue={new Date()}
              required
            />
            {errors.dateOfEmployment && (
              <span className="text-red-700">
                Data zatrudnienia jest wymagana
              </span>
            )}
            <Select
              emptyOption={'Brak'}
              label={'Dział'}
              name={'departmentId'}
              register={register}
              required>
              <optgroup label="Działy:">
                {store.getDepartments().map((department, key) => (
                  <option key={key} value={department.departmentId}>
                    {department.name}
                  </option>
                ))}
              </optgroup>
            </Select>
            {errors.departmentId && (
              <span className="text-red-700">Dział jest wymagany</span>
            )}
            <Select
              emptyOption={'Brak'}
              label={'Projekt'}
              name={'projectId'}
              register={register}>
              {projects.data ? (
                <optgroup label="Projekty:">
                  {projects.data.map((project, key) => (
                    <option key={key} value={project.projectId}>
                      {project.name}
                    </option>
                  ))}
                </optgroup>
              ) : (
                <option>...Loading</option>
              )}
            </Select>
            <button
              type="submit"
              disabled={createEmployee.isPending}
              className="px-8 py-2 border-2 rounded-md bg-cyan-100 border-sky-800 hover:bg-cyan-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed">
              Dodaj
            </button>
            {createEmployee.isSuccess && (
              <span className="text-green-700">Pracownik dodany</span>
            )}
            {createEmployee.isError && (
              <span className="text-red-700">
                Błąd przy dodawaniu pracownika
              </span>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
