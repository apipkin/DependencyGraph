const graphNode = require('./GraphNode').Factory;
const CircularDependency = require('./CircularDependency');
const NodeRetrievalError = require('./NodeRetrievalError');

/**
 * 
 */
const DependencyGraph = {
  /**
   * @property {Object} nodes
   */
  nodes: {},

  /**
   * Adds nodes to data used to build create and pass inbound data to a node
   * @param {String} data Dependency structure 
   */
  build(data) {
    // data should be from a txt file; checked before sending to build()
    if (typeof data !== 'string') {
      data = data.toString();
    }

    data.split('\n').forEach((line) => {
      line = line.replace(/^\s+/, '')   // trim leading spaces
                 .replace(/\s+$/, '')   // trim trailing spaces
                 .replace(/\s+/g, ' '); // replace consecutive spaces

      var parts = line.split(' ');
      var name = parts.shift();
      this.addNode(name, { inbound: parts });
      parts.forEach(name => (this.addNode(name)));
    });
  },

  /**
   * Resets the discovered state of the nodes and returns the list of nodes 
   *   with inboud dependencies to the provided named node. 
   * @param {String} name
   * @returns {String}
   */
  getInboundNodes(name) {
    this.resetNodes();
    return this.walkInboud(name).join(' ');
  },

  /**
   * Returns an array of all known node names.
   * @returns {array}
   */
  getNodeNames() {
    return Object.keys(this.nodes).sort();
  },

  /**
   * Returns a node when found using the given name. If no node is found, 
   *   returns null.
   * @param {String} name
   * @returns {Object|null} GraphNode or null
   */
  getNode(name) {
    return this.nodes[name] || null;
  },

  /**
   * Instantiates a node and adds it to the graph. Options are used to add 
   *   additional data to the node at instantiation
   * @param {String} name
   * @param {Object} [options] 
   * @returns {Object} DependencyGraph
   */
  addNode(name, options) {
    var nodePrimer = (this.nodes[name] || { name: name });
    this.nodes[name] = graphNode(Object.assign(nodePrimer, options)); 
    return this; 
  },

  /**
   * Walks inbound nodes og the DependencyGraph and retruns an array of
   *   discovered nodes
   * @throws NodeRetrievalError if node cannot be found in the graph
   * @throws CircularDependency if the node discovered is already discovered
   * @param {Object} node GraphNode
   * @returns {array}
   */
  walkInboud(node) {
    var nodes = [];

    node = this.getNode(node);

    if (!node) {
      throw new NodeRetrievalError(`Cannot find node: ${node}`);
    }

    if (node.isDiscovered()) {
      throw new CircularDependency(`Node ${node} has been found already.`);
    }
    
    nodes.push(node);
    node.setDiscovered(true);

    var stack = node.getInbound().concat();

    while (stack.length) {
      nodes = nodes.concat(this.walkInboud(stack.pop()));
    }

    return nodes;
  },

  /**
   * Sets all nodes as undiscovered
   */
  resetNodes() {
    Object.keys(this.nodes).forEach(n => ( this.nodes[n].setDiscovered(false) ));
  },

  /**
   * Serializes the DependencyGraph nodes
   * @returns {String} 
   */
  serialize: function () {
    return JSON.stringify(this.nodes);
  },

  /**
   * Populates the DependencyGraph with nodes from a previously serialized 
   *   instance
   * @param {String} 
   * @returns {Object} DependencyGraph instance with nodes
   */
  hydrate: function (nodes) {
    nodes = JSON.parse(nodes);
    Object.keys(nodes).forEach(n => {
      nodes[n] = graphNode(nodes[n]);
    });
    this.nodes = nodes;
    return this;
  }
};

// exports
module.exports = function () {
  return Object.assign({}, DependencyGraph, { nodes: {} });
}