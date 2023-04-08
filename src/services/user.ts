import apiClient from '../utils/apiClients/apiClient';
import type { UserDto } from 'types/user';
import type { AxiosResponse } from 'axios';

export const getAllUsers = async (): Promise<UserDto[]> => {
  const { data } = await apiClient.get<UserDto[], AxiosResponse<UserDto[]>>('/user/');
  return data;
};

export const getUserById = async (id: number): Promise<UserDto> => {
  const { data } = await apiClient.get<UserDto, AxiosResponse<UserDto>>(`/user/${id}`);
  return data;
};
