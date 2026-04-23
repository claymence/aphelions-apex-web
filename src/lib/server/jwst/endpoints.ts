// JWST API endpoint abstractions

export const JWSTEndpoints = {
	/**
	 * Get all data by file type (jpg, ecsv, fits, json)
	 */
	allByType: (type: string) => `/all/type/${type}`,

	/**
	 * Get all data from a program ID
	 */
	byProgram: (id: string) => `/program/id/${id}`,

	/**
	 * Get all data by suffix
	 */
	bySuffix: (suffix: string) => `/all/suffix/${suffix}`,

	/**
	 * Get all data from an observation ID
	 */
	byObservation: (id: string) => `/observation/${id}`
};
