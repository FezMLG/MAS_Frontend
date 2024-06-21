import { useGetDepartments } from '@/api';
import React from 'react';
import { useDepartmentStore } from '@/store';

export const DepartmentAndEmployeeSelect = () => {
  const departments = useGetDepartments();
  const store = useDepartmentStore(state => state);

  return (
    <form className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          className="border-2 rounded-md p-2 min-w-36 cursor-pointer"
          onChange={e => {
            store.setSelectedDepartment(parseInt(e.target.value));
          }}>
          <option defaultChecked>Select</option>
          {departments.data ? (
            departments.data.map(department => (
              <option
                key={department.departmentId}
                value={department.departmentId}>
                {department.name}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="department">Employee</label>
        <select
          id="department"
          name="department0"
          className="border-2 rounded-md p-2 min-w-36 cursor-pointer disabled:cursor-not-allowed"
          onChange={e => {
            store.setSelectedEmployee(parseInt(e.target.value));
          }}
          disabled={!store.selectedDepartment}>
          <option defaultChecked>Select</option>
          {store.selectedDepartment ? (
            store.getEmployeesFromDepartment()?.map(employee => (
              <option key={employee.personId} value={employee.personId}>
                {employee.name} {employee.surname}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>
    </form>
  );
};
