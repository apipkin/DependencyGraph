// Custom Error
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

/**
 * Custom error message to throw if a node cannot be found
 * @constructor
 * @param {string} [msg] custom message
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
