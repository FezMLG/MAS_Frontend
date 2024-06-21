import { useMutation } from '@tanstack/react-query';
import { apiClient, CreateTaskDto } from '@/api/ApiClient';
import { useDepartmentStore } from '@/store';

export const usePostTask = () => {
  const store = useDepartmentStore(state => state);

  return useMutation({
    mutationFn: async (task: CreateTaskDto): Promise<void> => {
      const projectId = store.getSelectedEmployeeProject()?.projectId;

      if (!projectId) {
        throw new Error('Project not found');
      }

      return apiClient.postTask(projectId, task);
    },
  });
};
