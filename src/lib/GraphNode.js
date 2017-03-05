/**
 * Factory: Creates and returns a node that can be added to a graph structure. 
 * @param {Object} [primer] Instance values to override default values
 * @return {Object} GraphNode
 */
var Factory = function (primer) {

  return Object.assign({
    name: null,
    inbound: [],
    discovered: false
  }, primer, {
    toString: toString,
    isDiscovered: isDiscovered,
    setDiscovered: setDiscovered,
    getInbound: getInbound
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
  return this.name === null ? '' : this.name.toString();
}

/**
 * Evaluates the presence of a name
 * @returns {boolean}
 */
function isDiscovered () {
  return this.discovered === true;
}

/**
 * Sets the value of whether the node has been discovered
 * @param {boolean} discovered
 * @return {Object} GraphNode
 */
function setDiscovered (discovered) {
  this.discovered = !!discovered;
  return this;
}

/**
 * Returns all known inbound node names
 * @return {array} inbound node names
 */
function getInbound () {
  return this.inbound;
}
