export const TIMEOUT_IN_MS = 6000;
export const DBPEDIA_SPARQL_ENDPOINT = `https://dbpedia.org/sparql?timeout=${TIMEOUT_IN_MS}`;
export const DBPEDIA_RESOURCE_URL_PATH = 'http://dbpedia.org/resource/';

export const escapeRegex = (str: string): string => str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');

export const DBPEDIA_SINGLE_ENTITY_SPARQL = (resource: string) => `
      PREFIX dbr: <http://dbpedia.org/resource/>
      PREFIX dbo: <http://dbpedia.org/ontology/>
      
      SELECT  dbr:${escapeRegex(resource)} AS ?entity ?image ?abs WHERE {
       dbr:${escapeRegex(resource)} dbo:thumbnail ?image; dbo:abstract ?abs .
      FILTER(langMatches(lang(?abs),"en"))
      } LIMIT 1
`;
