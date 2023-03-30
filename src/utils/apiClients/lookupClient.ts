import axios from 'axios';

const lookupClient = axios.create({
	baseURL: ' https://lookup.dbpedia.org/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default lookupClient;
