import { useMutation } from '@tanstack/react-query';
import { apiClient, CreateDepartmentDto, CreateTaskDto } from '@/api/ApiClient';
import { useDepartmentStore } from '@/store';

export const usePostDepartment = () => {
  return useMutation({
    mutationFn: async (department: CreateDepartmentDto): Promise<void> => {
      return apiClient.postDepartment(department);
    },
  });
};
