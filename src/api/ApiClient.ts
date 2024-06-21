import axios from 'axios';

export type ReaderDto = {
  readerId: number;
  personId: number;
  cardNumber: string;
  name: string;
  surname: string;
  birthDate: string | null;
  email: string;
};

export type BookDto = {
  id: number;
  title: string;
  releaseYear: number;
  bookType: string;
};

export type ProjectDto = {
  projectId: number;
  name: string;
};

export type EmployeeDto = {
  assignedProject: ProjectDto | null;
  dateOfEmployment: string;
  employeeId: number;
  supervisor: boolean;
};

export type PersonDto = {
  personId: number;
  name: string;
  surname: string;
  birthDate: string | null;
  email: string;
  employeeRole: EmployeeDto;
};

export type DepartmentDto = {
  departmentId: number;
  name: string;
  allEmployees: PersonDto[];
};

export type CreateTaskDto = {
  name: string;
  startDate: string;
  endDate: string | null;
};

export type CreateDepartmentDto = {
  name: string;
};

export type CreateProjectDto = {
  name: string;
};

export type CreateEmployeeDto = {
  name: string;
  surname: string;
  birthDate: string | null;
  email: string;
  dateOfEmployment: string;
  departmentId: number;
  projectId: number | null;
};

const ApiClient = () => {
  axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';
  return {
    getReader: async (cardNumber: string) => {
      const response = await axios.get<ReaderDto>(
        'readers/cards/' + cardNumber,
      );

      return response.data;
    },
    getBook: async (index: string) => {
      const response = await axios.get<BookDto>('books/' + index);

      return response.data;
    },
    getDepartments: async () => {
      const response = await axios.get<DepartmentDto[]>('departments');

      return response.data;
    },
    postTask: async (projectId: number, task: CreateTaskDto) => {
      await axios.post<CreateTaskDto>(`projects/${projectId}/tasks`, task);
    },
    postDepartment: async (department: CreateDepartmentDto) => {
      await axios.post<CreateDepartmentDto>(`departments`, department);
    },
    postEmployee: async (employee: CreateEmployeeDto) => {
      await axios.post<CreateEmployeeDto>(`employees`, employee);
    },
    getProjects: async () => {
      const response = await axios.get<ProjectDto[]>('projects');

      return response.data;
    },
    postProject: async (project: CreateProjectDto) => {
      await axios.post<CreateProjectDto>(`projects`, project);
    },
  };
};

export const apiClient = ApiClient();
