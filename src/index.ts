import json from './lib/json';

const _defineResponse = (statusCode: number, data: {}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode,
    body: json.stringify(data),
  };
};

const _errorResponse = (statusCode: number, message: string, extraProps?: {}) => {
  return _defineResponse(statusCode, {
    error: true,
    message,
    ...extraProps,
  });
};

/**
 * A collection of response utility functions for AWS Lambda Proxy Integrations.
 */
const Responses = {
  /**
   * Generates a 200 OK response.
   * @param data The response data.
   * @returns The 200 OK response.
   */
  _200(data = {}) {
    if (Array.isArray(data)) {
      return _defineResponse(200, {
        error: false,
        items: data,
      });
    } else {
      return _defineResponse(200, {
        error: false,
        ...data,
      });
    }
  },

  /**
   * Generates a 303 See Other response.
   * @param data The response data.
   * @returns The 303 See Other response.
   */
  _303(data = {}) {
    return _defineResponse(303, data);
  },

  /**
   * Generates a 400 Bad Request response.
   * @param message The error message.
   * @param extraProps Additional properties to include in the response.
   * @returns The 400 Bad Request response.
   */
  _400(message = 'There are missing or invalid parameters.', extraProps?: {}) {
    return _errorResponse(400, message, extraProps);
  },

  /**
   * Generates a 401 Unauthorized response.
   * @param message The error message.
   * @param extraProps Additional properties to include in the response.
   * @returns The 401 Unauthorized response.
   */
  _401(message = 'Unauthorized.', extraProps?: {}) {
    return _errorResponse(401, message, extraProps);
  },

  /**
   * Generates a 403 Forbidden response.
   * @param message The error message.
   * @param extraProps Additional properties to include in the response.
   * @returns The 403 Forbidden response.
   */
  _403(message = 'Forbidden.', extraProps = {}) {
    return _errorResponse(403, message, extraProps);
  },

  /**
   * Generates a 404 Not Found response.
   * @param message The error message.
   * @param extraProps Additional properties to include in the response.
   * @returns The 404 Not Found response.
   */
  _404(message = 'Resource not found.', extraProps?: {}) {
    return _errorResponse(404, message, extraProps);
  },

  /**
   * Generates a 429 Too Many Requests response.
   * @param message The error message.
   * @param extraProps Additional properties to include in the response.
   * @returns The 429 Too Many Requests response.
   */
  _429(message = 'Too many requests.', extraProps = {}) {
    return _errorResponse(429, message, extraProps);
  },

  /**
   * Generates a 500 Internal Server Error response.
   * @param message The error message.
   * @returns The 500 Internal Server Error response.
   */
  _500(message = 'Internal server error occurred.') {
    return _errorResponse(500, message);
  },
};

export = Responses;
