import { useQuery } from '@tanstack/react-query';
import { apiClient, DepartmentDto } from '@/api/ApiClient';
import { useDepartmentStore } from '@/store';

export const useGetDepartments = () => {
  const store = useDepartmentStore(state => state);

  return useQuery<DepartmentDto[]>({
    queryKey: ['departments'],
    queryFn: async () => {
      const data = await apiClient.getDepartments();

      store.setDepartments(data);

      return data;
    },
  });
};
