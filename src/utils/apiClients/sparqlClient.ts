import ParsingClient from 'sparql-http-client/ParsingClient';
import { DBPEDIA_SPARQL_ENDPOINT } from '../../constants/sparql';
import { type ResultRow } from 'sparql-http-client/ResultParser';

export const client: ParsingClient = new ParsingClient({
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
