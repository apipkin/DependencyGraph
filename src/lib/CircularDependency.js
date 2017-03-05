// Custom Error
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

/**
 * Custom error message to throw if a value is not valid
 * @constructor
 * @param {string} [msg] custom message
 */
function CircularDependency (msg) {
  this.name = 'CircularDependency';
  this.message = msg || 'Circular dependency was detected.';
  this.stack = (new Error()).stack;
}

CircularDependency.prototype = Object.create(Error.prototype);
CircularDependency.prototype.constructor = CircularDependency;

// exports
module.exports = CircularDependency;
