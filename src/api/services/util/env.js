/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv() {
  return import.meta.env;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode() {
  return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode() {
  return import.meta.env.PROD;
}
