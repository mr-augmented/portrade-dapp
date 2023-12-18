export const API_RESPONSE_CODE = {
  API_SUCCESS: 200,
  API_BAD_REQUEST: 400,
  API_UNAUTHORIZED: 401,
  API_NOT_FOUND: 404,
  API_VALIDATION_ERROR: 422,
  API_SERVER_ERROR: 500,
  API_NOT_IMPLEMENTED: 501,
  API_SERVICE_UNAVAILABLE: 503,
  API_GATEWAY_TIMEOUT: 504,
  DAPP_USER_REJECTED: 'UserRejectedRequestError',
  DAPP_CONNECTOR_NOT_AVAILABLE: 'ConnectorNotFoundError',
};

export const API_RESPONSE_MESSAGE = {
  [API_RESPONSE_CODE.API_SUCCESS]: 'Success!',
  [API_RESPONSE_CODE.API_BAD_REQUEST]: 'Uh oh! Looks like there was a problem with your request.',
  [API_RESPONSE_CODE.API_UNAUTHORIZED]: 'Uh oh! Looks like you are not authorized to access this.',
  [API_RESPONSE_CODE.API_NOT_FOUND]: 'Uh oh! Looks like the what you are looking for does not exist.',
  [API_RESPONSE_CODE.API_VALIDATION_ERROR]: 'Uh oh! Looks like there was a problem with your request.',
  [API_RESPONSE_CODE.API_SERVER_ERROR]: 'Uh oh! Looks like something went wrong. Please try again later',
  [API_RESPONSE_CODE.API_NOT_IMPLEMENTED]: 'Uh oh! Looks like this feature is not implemented yet.',
  [API_RESPONSE_CODE.DAPP_USER_REJECTED]: 'Uh oh! Looks like you rejected the request.',
  [API_RESPONSE_CODE.DAPP_CONNECTOR_NOT_AVAILABLE]: 'Uh oh! Looks like Meta Mask is not available.',
};
