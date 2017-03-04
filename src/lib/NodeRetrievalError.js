// Custom Error
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

/**
 * Custom error message to throw if a value is not valid
 * @param {string} [Optional] custom message
 */
function NodeRetrievalError (msg) {
  this.name = 'NodeRetrievalError';
  this.message = msg || 'Node cannot be found.';
  this.stack = (new Error()).stack;
}

NodeRetrievalError.prototype = Object.create(Error.prototype);
NodeRetrievalError.prototype.constructor = NodeRetrievalError;

// exports
module.exports = NodeRetrievalError;
