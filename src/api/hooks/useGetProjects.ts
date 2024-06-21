import { useQuery } from '@tanstack/react-query';
import { apiClient, DepartmentDto, ProjectDto } from '@/api/ApiClient';
import { useDepartmentStore } from '@/store';

export const useGetProjects = () => {
  return useQuery<ProjectDto[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      return apiClient.getProjects();
    },
  });
};
