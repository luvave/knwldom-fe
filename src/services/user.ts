import apiClient from '../utils/apiClients/apiClient';
import type { UserDto } from 'types/user';
import type { AxiosResponse } from 'axios';

export const getAllUsers = async (): Promise<UserDto[]> => {
	const response = await apiClient.get<UserDto[], AxiosResponse<UserDto[]>>('/');
	return response.data;
};

export const getUserById = async (id: number): Promise<UserDto> => {
	const response = await apiClient.get<UserDto, AxiosResponse<UserDto>>('/user', {
		params: {
			id,
		},
	});
	return response.data;
};
