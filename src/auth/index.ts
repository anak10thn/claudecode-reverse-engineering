/**
 * Authentication Module
 * 
 * Main entry point for authentication functionality.
 * Uses environment variables for authentication.
 */

import { AuthToken, AuthResult } from './types.js';
import { logger } from '../utils/logger.js';
import { initEnvAuth, getAuthToken } from './env.js';

/**
 * Current authentication state
 */
let currentToken: AuthToken | null = null;

/**
 * Initialize the authentication system
 */
export async function initAuthentication(): Promise<any> {
  logger.info('Initializing authentication system');
  
  try {
    // Initialize environment-based authentication
    const result = await initEnvAuth();
    
    if (result.success && result.token) {
      currentToken = result.token;
    }
    
    logger.info('Authentication system initialized successfully');
    
    // Return auth interface
    return {
      /**
       * Get the current token
       */
      getToken: (): AuthToken | null => {
        return currentToken;
      },
      
      /**
       * Check if authenticated
       */
      isAuthenticated: (): boolean => {
        return !!currentToken;
      },
      
      /**
       * Get authorization header
       */
      getAuthorizationHeader: (): string | null => {
        if (!currentToken) {
          return null;
        }
        return `${currentToken.tokenType} ${currentToken.accessToken}`;
      }
    };
  } catch (error) {
    logger.error('Failed to initialize authentication system', error);
    throw error;
  }
}

// Export auth types
export * from './types.js';
