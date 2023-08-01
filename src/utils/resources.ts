export const getResourceUrl = (resource: string): string => {
  return resource.substring(1, resource.length - 1);
};

export const getResourceName = (resource: string): string => {
  const removedBrackets = getResourceUrl(resource);
  const parts = removedBrackets.split('/');
  const name = parts[parts.length - 1];
  return decodeURIComponent(name.replace('_', ' '));
};

export const formatResourceFromLookup = (resource?: string): string => {
  if (typeof resource === 'undefined') return '';
  return `<${resource}>`;
};
