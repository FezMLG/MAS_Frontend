import { create } from 'zustand';
import { DepartmentDto, PersonDto, ProjectDto } from '@/api/ApiClient';

interface DepartmentStoreState {
  departments: DepartmentDto[];
  selectedDepartment: DepartmentDto | null;
  setSelectedDepartment: (departmentId: number) => void;
  getSelectedDepartment: () => DepartmentDto | null;
  selectedEmployee: PersonDto | null;
  setSelectedEmployee: (employeeId: number) => void;
  getSelectedEmployee: () => PersonDto | null;
  setDepartments: (departments: DepartmentDto[]) => void;
  getDepartments: () => DepartmentDto[];
  getDepartment: (departmentId: number) => DepartmentDto | null;
  getEmployees: () => PersonDto[] | null;
  getEmployee: (personId: number) => PersonDto | null;
  getProject: (employeeId: number) => ProjectDto | null;
  getSelectedEmployeeProject: () => ProjectDto | null;
  getEmployeesFromDepartment: () => PersonDto[] | null;
}

export const useDepartmentStore = create<DepartmentStoreState>((set, get) => ({
  departments: [],
  selectedDepartment: null,
  setSelectedDepartment: departmentId => {
    const department = get().getDepartment(departmentId);

    if (department) {
      set({ selectedDepartment: department });
    }
  },
  getSelectedDepartment: () => get().selectedDepartment,
  selectedEmployee: null,
  setSelectedEmployee: employeeId => {
    const employee = get().getEmployee(employeeId);

    if (employee) {
      set({ selectedEmployee: employee });
    }
  },
  getSelectedEmployee: () => get().selectedEmployee,
  setDepartments: departments => set({ departments }),
  getDepartments: () => get().departments,
  getDepartment: departmentId =>
    get().departments.find(
      department => department.departmentId === departmentId,
    ) || null,
  getEmployees: () =>
    get().departments.flatMap(department => department.allEmployees),
  getEmployee: personId => {
    const employees = get().getEmployees();

    if (!employees) {
      return null;
    }

    return employees.find(employee => employee.personId === personId) || null;
  },
  getProject: employeeId => {
    const employees = get().getEmployees();

    if (!employees) {
      return null;
    }

    const employee =
      employees.find(employee => employee.personId === employeeId) || null;

    return employee?.employeeRole.assignedProject || null;
  },
  getSelectedEmployeeProject: () => {
    const selectedEmployee = get().getSelectedEmployee();

    if (!selectedEmployee) {
      return null;
    }

    return selectedEmployee.employeeRole.assignedProject;
  },
  getEmployeesFromDepartment: () => {
    const selectedDepartment = get().getSelectedDepartment();

    if (!selectedDepartment) {
      return null;
    }

    return selectedDepartment.allEmployees;
  },
}));
