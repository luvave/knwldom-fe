import lookupClient from '../utils/apiClients/lookupClient';
import { type LookupResult } from '../types/lookup';
import { type AxiosResponse } from 'axios';

export const lookupSearch = async (search?: string) => {
  const response = await lookupClient.get<LookupResult, AxiosResponse<LookupResult>>('/search', {
    params: {
      query: search,
      format: 'JSON',
    },
  });

  return response.data;
};
