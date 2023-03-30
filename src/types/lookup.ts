export interface LookupEntity {
	label?: string[];
	resource?: string[];
	comment?: string[];
}

export interface LookupResult {
	docs?: LookupEntity[];
}
