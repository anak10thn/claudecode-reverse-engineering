/**
 * Environment-based Authentication
 * 
 * Handles authentication using environment variables
 */

import { AuthToken, AuthMethod, AuthState, AuthResult } from './types.js';
import { logger } from '../utils/logger.js';
import { createUserError } from '../errors/formatter.js';
import { ErrorCategory } from '../errors/types.js';

/**
 * Required environment variables
 */
const ENV_VARS = {
  API_KEY: 'ANTHROPIC_API_KEY',
  API_URL: 'ANTHROPIC_API_URL',
  MODEL: 'ANTHROPIC_MODEL',
};

/**
 * Check if required environment variables are set
 */
export function checkEnvVars(): void {
  const missing = Object.entries(ENV_VARS)
    .filter(([_, envVar]) => !process.env[envVar])
    .map(([name]) => name);

  if (missing.length > 0) {
    throw createUserError(`Missing required environment variables: ${missing.join(', ')}`, {
      category: ErrorCategory.CONFIGURATION,
      resolution: 'Please set the required environment variables in your .env file or environment'
    });
  }
}

/**
 * Get authentication token from environment
 */
export function getAuthToken(): AuthToken {
  const apiKey = process.env[ENV_VARS.API_KEY];
  
  if (!apiKey) {
    throw createUserError('API key not found in environment', {
      category: ErrorCategory.AUTHENTICATION,
      resolution: `Please set the ${ENV_VARS.API_KEY} environment variable`
    });
  }

  return {
    accessToken: apiKey,
    tokenType: 'Bearer',
    expiresAt: 0, // API keys don't expire
    scope: 'anthropic.api'
  };
}

/**
 * Initialize authentication from environment
 */
export async function initEnvAuth(): Promise<AuthResult> {
  logger.info('Initializing environment-based authentication');
  
  try {
    // Check required environment variables
    checkEnvVars();
    
    // Create token from API key
    const token = getAuthToken();
    
    logger.info('Successfully authenticated using environment variables');
    
    return {
      success: true,
      token,
      method: AuthMethod.API_KEY,
      state: AuthState.AUTHENTICATED
    };
  } catch (error) {
    logger.error('Failed to initialize environment-based authentication', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      method: AuthMethod.API_KEY,
      state: AuthState.FAILED
    };
  }
}