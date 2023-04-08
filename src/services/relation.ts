import apiClient from '../utils/apiClients/apiClient';
import { type RelationDto } from '../types/relation';

export const addRelation = async (relationDto: RelationDto): Promise<number> => {
	const { status } = await apiClient.post('/relation/add', relationDto);
	return status;
};

export const removeRelation = async (relationDto: RelationDto): Promise<number> => {
	const { status } = await apiClient.post('/relation/remove', relationDto);
	return status;
};
