/**
 * Storage key for device ID in localStorage
 */
const STORAGE_KEY = 'vizchitra_device_id';

/**
 * UUID v4 validation regex
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Gets existing device ID from localStorage or creates a new one
 * @returns Device ID string (UUID v4)
 */
export function getOrCreateDeviceId(): string {
	if (typeof window === 'undefined') {
		// Server-side rendering - return empty string
		return '';
	}

	try {
		// Try to get existing device ID
		let deviceId = localStorage.getItem(STORAGE_KEY);

		// Create new one if doesn't exist or is invalid
		if (!deviceId || !isValidDeviceId(deviceId)) {
			deviceId = crypto.randomUUID();
			localStorage.setItem(STORAGE_KEY, deviceId);
		}

		return deviceId;
	} catch (error) {
		// localStorage might not be available (private browsing, etc.)
		console.warn('Failed to access localStorage for device ID:', error);
		return crypto.randomUUID(); // Return temporary ID
	}
}

/**
 * Validates that a string is a valid UUID v4
 * @param deviceId - Device ID to validate
 * @returns True if valid UUID v4, false otherwise
 */
export function isValidDeviceId(deviceId: string): boolean {
	return UUID_REGEX.test(deviceId);
}

/**
 * Clears the stored device ID (useful for testing)
 */
export function clearDeviceId(): void {
	if (typeof window !== 'undefined') {
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch (error) {
			console.warn('Failed to clear device ID:', error);
		}
	}
}
