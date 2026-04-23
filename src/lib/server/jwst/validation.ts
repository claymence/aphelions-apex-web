import type { JWSTFilters } from './types';

export interface ValidationResult {
	valid: boolean;
	error?: string;
}

/**
 * Validation rules for JWST filter inputs
 */

const MAX_LENGTH = 100;
const MIN_SEARCH_LENGTH = 3;

/**
 * Validate program ID (should be numeric)
 */
export function validateProgram(program: string): ValidationResult {
	if (program.length > MAX_LENGTH) {
		return { valid: false, error: 'Program ID too long (max 100 characters)' };
	}

	if (!/^\d+$/.test(program)) {
		return { valid: false, error: 'Program ID must contain only numbers' };
	}

	return { valid: true };
}

/**
 * Validate suffix (alphanumeric + underscore, typical JWST suffixes)
 */
export function validateSuffix(suffix: string): ValidationResult {
	if (suffix.length > MAX_LENGTH) {
		return { valid: false, error: 'Suffix too long (max 100 characters)' };
	}

	if (suffix.length < MIN_SEARCH_LENGTH) {
		return { valid: false, error: `Suffix must be at least ${MIN_SEARCH_LENGTH} characters` };
	}

	if (!/^[a-zA-Z0-9_]+$/.test(suffix)) {
		return {
			valid: false,
			error: 'Suffix must contain only letters, numbers, and underscores'
		};
	}

	return { valid: true };
}

/**
 * Validate observation ID (JWST observation ID format)
 * Example: jw02731002001_02107_00004_mirimage_o002
 */
export function validateObservationId(observationId: string): ValidationResult {
	if (observationId.length > MAX_LENGTH) {
		return { valid: false, error: 'Observation ID too long (max 100 characters)' };
	}

	if (observationId.length < MIN_SEARCH_LENGTH) {
		return {
			valid: false,
			error: `Observation ID must be at least ${MIN_SEARCH_LENGTH} characters`
		};
	}

	// Allow alphanumeric, underscores, and hyphens
	if (!/^[a-zA-Z0-9_-]+$/.test(observationId)) {
		return { valid: false, error: 'Observation ID contains invalid characters' };
	}

	return { valid: true };
}

/**
 * Validate file type (whitelist)
 */
const VALID_FILE_TYPES = ['jpg', 'png', 'ecsv', 'fits', 'json'];

export function validateFileType(fileType: string): ValidationResult {
	if (!VALID_FILE_TYPES.includes(fileType.toLowerCase())) {
		return {
			valid: false,
			error: `Invalid file type. Must be one of: ${VALID_FILE_TYPES.join(', ')}`
		};
	}

	return { valid: true };
}

/**
 * Validate page number
 */
export function validatePage(page: number): ValidationResult {
	if (isNaN(page) || page < 1) {
		return { valid: false, error: 'Page number must be a positive integer' };
	}

	if (page > 10000) {
		return { valid: false, error: 'Page number too large' };
	}

	return { valid: true };
}

/**
 * Validate items per page
 */
export function validatePerPage(perPage: number): ValidationResult {
	if (isNaN(perPage) || perPage < 1) {
		return { valid: false, error: 'Items per page must be a positive integer' };
	}

	if (perPage > 100) {
		return { valid: false, error: 'Items per page cannot exceed 100' };
	}

	return { valid: true };
}

/**
 * Validate all filters and return first error encountered
 */
export function validateFilters(filters: JWSTFilters): ValidationResult {
	// Validate page
	const pageValidation = validatePage(filters.page ?? 1);
	if (!pageValidation.valid) return pageValidation;

	// Validate perPage
	const perPageValidation = validatePerPage(filters.perPage ?? 3);
	if (!perPageValidation.valid) return perPageValidation;

	// Validate active filter
	if (filters.program) {
		return validateProgram(filters.program);
	}

	if (filters.suffix) {
		return validateSuffix(filters.suffix);
	}

	if (filters.observationId) {
		return validateObservationId(filters.observationId);
	}

	if (filters.fileType) {
		return validateFileType(filters.fileType);
	}

	return { valid: true };
}
