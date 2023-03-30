import ParsingClient from 'sparql-http-client/ParsingClient';
import { DBPEDIA_SINGLE_ENTITY_SPARQL, DBPEDIA_SPARQL_ENDPOINT } from '../constants/sparql';
import { type ResultRow } from 'sparql-http-client/ResultParser';

const client: ParsingClient = new ParsingClient({
	endpointUrl: DBPEDIA_SPARQL_ENDPOINT,
});

const exampleQuery =
	'SELECT *\n' +
	'WHERE\n' +
	'{\n' +
	'  ?athlete  rdfs:label      "Cristiano Ronaldo"@en ;\n' +
	'            dbo:number      ?number ;\n' +
	'            dbo:birthPlace  ?place .\n' +
	'}';

export const testConnection = async (): Promise<ResultRow[]> => {
	const result = await client.query.select(exampleQuery);
	return result;
};

export const getSingleEntity = async (resource: string): Promise<ResultRow> => {
	const result = await client.query.select(DBPEDIA_SINGLE_ENTITY_SPARQL(resource));
	if (Array.isArray(result) && result.length > 0) {
		return result[0];
	}
	throw new Error('Invalid data');
};
