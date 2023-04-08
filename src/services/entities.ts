import { type ResultRow } from 'sparql-http-client/ResultParser';
import { DBPEDIA_SINGLE_ENTITY_SPARQL } from '../constants/sparql';
import { client } from '../utils/apiClients/sparqlClient';

export const getSingleEntity = async (resource: string): Promise<ResultRow> => {
  const result = await client.query.select(DBPEDIA_SINGLE_ENTITY_SPARQL(resource));
  if (Array.isArray(result) && result.length > 0) {
    return result[0];
  }
  throw new Error('Invalid data');
};
