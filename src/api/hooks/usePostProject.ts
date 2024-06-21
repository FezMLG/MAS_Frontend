import { useMutation } from '@tanstack/react-query';
import { apiClient, CreateProjectDto } from '@/api/ApiClient';

export const usePostProject = () => {
  return useMutation({
    mutationFn: async (project: CreateProjectDto): Promise<void> => {
      return apiClient.postProject(project);
    },
  });
};
