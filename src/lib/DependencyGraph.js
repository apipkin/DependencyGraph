const graphNode = require('./GraphNode').Factory;

const DependencyGraph = {
  /**
   * @property {Object} nodes
   */
  nodes: {},

  /**
   * @param {String}
   */
  build(data) {
    // test for data to be a string
    // data should be from a txt file; checked before sending to build()
    data.split('\n').forEach((line) => {
      line = line.replace(/^\s+/, '')   // trim leading spaces
                 .replace(/\s+$/, '')   // trim trailing spaces
                 .replace(/\s+/g, ' '); // replace consecutive spaces

      var parts = line.split(' ');
      var name = parts.shift();
      this.addNode(name, { neighbors: parts });
      parts.forEach(name => (this.addNode(name)));
    });

    // display sucess message
  },

  /**
   * @param {String} name
   * @returns {String}
   */
  getInboundNodes(name) {
    this.resetNodes();
    // console.log(this.walkInboud(name));
    this.resetNodes();
    return this.walkInboud(name).join(' ');
  },

  /**
   * @returns {array}
   */
  getNodeNames() {
    return Object.keys(this.nodes).sort();
  },

  /**
   * @param {String} name
   * @returns {Object|null} GraphNode or null
   */
  getNode(name) {
    return this.nodes[name] || null;
  },

  /**
   * @param {String} name
   * @param {Object} [optional] options
   */
  addNode(name, options) {
    var nodePrimer = (this.nodes[name] || { name: name });
    this.nodes[name] = graphNode(Object.assign(nodePrimer, options));  
  },

  /**
   * @param {Object} node GraphNode
   * @returns {array}
   */
  walkInboud(node) {
    var nodes = [];

    node = this.getNode(node);

    if (!node) {
      // throw NodeRetrievalError
      console.log('no node... ');
      return nodes;
    }

    if (node.isDiscovered()) {
      // throw cycle detected exception
      console.log('node ' + node + ' has been found');
      return nodes;
    }
    
    nodes.push(node);
    node.setDiscovered(true);

    var stack = node.neighbors.concat();

    while (stack.length) {
      nodes = nodes.concat(this.walkInboud(stack.pop()));
    }

    return nodes;
  },

  /**
   * 
   */
  resetNodes() {
    Object.keys(this.nodes).forEach(n => ( this.nodes[n].setDiscovered(false) ));
  },

  /**
   * @returns {String} 
   */
  dehydrate: function () {
    return JSON.stringify(this.nodes);
  },

  /**
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