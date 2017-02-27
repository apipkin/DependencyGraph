/**
 * Factory: . 
 * @param {Object} [optional] Instance values to override default values
 * @return {Object} Tree Node
 */
var Factory = function (primer) {

  return Object.assign({
    name: null,
    neighbors: [],
    discoverd: false
  }, primer, {
    toString: toString,
    toArray: toArray
  });
};

// exports
module.exports = {
  Factory: Factory
};

/**
 * Returns the string version of the name
 * @returns {String}
 */
function toString () {
  return this.name;
}

/**
 * Returns the current node and decending nodes as an array
 * @returns {Array}
 */
function toArray () {
  return this.getNeighbors();
}

/**
 * Evaluates the presence of a name
 * @returns {boolean}
 */
function hasName () {
  return this.name !== null;
}



