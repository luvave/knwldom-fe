export const HOME_ROUTE = '/';
export const GRAPH_ROUTE = '/app';
export const GRAPH_ROUTE_ID = '/app/:id';
export const getGraphRoute = (id: string) => `${GRAPH_ROUTE}/${id}`;
