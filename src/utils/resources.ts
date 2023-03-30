export const getResourceName = (resource: string): string => {
	const parts = resource.split('/');
	const name = parts[parts.length - 1];
	return decodeURIComponent(name.replace('_', ' '));
};

export const formatResourceFromLookup = (resource?: string): string => {
	if (typeof resource === 'undefined') return '';
	return `<${resource}>`;
};
