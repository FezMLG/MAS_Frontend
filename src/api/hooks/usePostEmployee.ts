import { useMutation } from '@tanstack/react-query';
import {
  apiClient,
  CreateDepartmentDto,
  CreateEmployeeDto,
  CreateTaskDto,
} from '@/api/ApiClient';
import { useDepartmentStore } from '@/store';

export const usePostEmployee = () => {
  return useMutation({
    mutationFn: async (employee: CreateEmployeeDto): Promise<void> => {
      return apiClient.postEmployee(employee);
    },
  });
};
