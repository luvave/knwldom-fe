import apiClient from '../utils/apiClients/apiClient';
import type { UserDto } from 'types/user';
import type { AxiosResponse } from 'axios';

export const getAllUsers = async (): Promise<UserDto[]> => {
  const { data } = await apiClient.get<UserDto[], AxiosResponse<UserDto[]>>('/user/');
  return data;
};

const user: UserDto = {
  name: 'Lukas',
  id: 2,
  hasConnectionTo: ['typescript', 'CTU'],
};

export const getUserById = async (id: number): Promise<UserDto> => {
  // const { data } = await apiClient.get<UserDto, AxiosResponse<UserDto>>(`/user/${id}`);
  // return data;
  return await new Promise<UserDto>((resolve, reject) => resolve(user));
};
