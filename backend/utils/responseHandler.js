/**
 * A robust, centralized response handler for Express.js
 * @param {Object} res - Express response object
 * @param {Object} config
 * @param {boolean} [config.success=true] - Indicates success or error
 * @param {number} [config.status=200] - HTTP status code
 * @param {string} config.message - Message describing the result
 * @param {Object} [config.data] - Payload on success
 * @param {Object} [config.error] - Error details on failure
 */
const responseHandler = (
    res,
    { success = true, status = 200, message = '', data = null, error = null }
  ) => {
    // Fallback if status is not a valid HTTP code
    const statusCode = Number.isInteger(status) && status >= 100 && status < 600 ? status : 500;
  
    const response = {
      success,
      status: statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
  
    if (success && data !== null) response.data = data;
    if (!success && error !== null) response.error = error;
  
    return res.status(statusCode).json(response);
  };
  
  module.exports = { responseHandler };
  