import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl, xAPIKey } from '../constants/configs';

export const useGetData = () => {
  const getData = async () => {
    const response = await axios.get(
      `${apiBaseUrl}/api/GetDashboardDetails?code=-6E8q1COd1_8GanV-FqnAjaaPax-ii7geqicnLwW3YqDAzFuUVj74g==`,
      { headers: { 'x-api-key': xAPIKey } },
    );
    return response.data;
  };

  return useQuery({
    queryKey: ['azure'],
    queryFn: () => getData(),
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });
};
