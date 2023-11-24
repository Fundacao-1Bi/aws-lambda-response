import json from './lib/json';

const _defineResponse = (statusCode = 502, data = {}) => {
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

const Responses = {
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

  _303(data = {}) {
    return _defineResponse(303, data);
  },

  _400(message = 'There are missing or invalid parameters.', extraProps?: {}) {
    return _errorResponse(400, message, extraProps);
  },

  _403(message = 'Forbidden', extraProps = {}) {
    return _errorResponse(403, message, extraProps);
  },

  _404(message = 'Resource not found.', extraProps?: {}) {
    return _errorResponse(404, message, extraProps);
  },

  _429(message = 'Too many requests.', extraProps = {}) {
    return _errorResponse(429, message, extraProps);
  },

  _500(message = 'Internal server error occurred.') {
    return _errorResponse(500, message);
  },
};

export default Responses;
