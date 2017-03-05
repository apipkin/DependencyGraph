// Custom Error
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

/**
 * Custom error message to throw if a value has a circular dependency
 * @constructor
 * @param {string} [msg] custom message
 */
function CircularDependency (msg) {
  this.name = 'CircularDependency';
  this.message = msg || 'A circular dependency was detected.';
  this.stack = (new Error()).stack;
}

CircularDependency.prototype = Object.create(Error.prototype);
CircularDependency.prototype.constructor = CircularDependency;

// exports
module.exports = CircularDependency;
