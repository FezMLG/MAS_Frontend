import { useQuery } from '@tanstack/react-query';
import { apiClient, ReaderDto } from '@/api/ApiClient';

export const useGetReader = (cardNumber: string) => {
  return useQuery<ReaderDto>({
    queryKey: ['reader', cardNumber],
    queryFn: () => {
      return apiClient.getReader(cardNumber);
    },
    enabled: false,
  });
};
