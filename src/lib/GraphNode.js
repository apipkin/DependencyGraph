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
    isDiscovered: isDiscovered,
    setDiscovered: setDiscovered
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
 * Evaluates the presence of a name
 * @returns {boolean}
 */
function isDiscovered () {
  return this.discoverd === true;
}

/**
 * Sets the value of whether the node has been discovered
 * @param {boolean} 
 * @return {Object} GraphNode
 */
function setDiscovered (discovered) {
  this.discoverd = !!discovered;
  return this;
}



