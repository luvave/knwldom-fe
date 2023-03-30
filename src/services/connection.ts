import apiClient from '../utils/apiClient';

export const addConnection = async (id: number, connection: string): Promise<number> => {
	const response = await apiClient.get('/add', {
		params: {
			id,
			connection,
		},
	});
	return response.status;
};

export const removeConnection = async (id: number, connection: string): Promise<number> => {
	const response = await apiClient.get('/remove', {
		params: {
			id,
			connection,
		},
	});
	return response.status;
};
