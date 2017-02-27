const graphNode = require('./GraphNode').Factory;

const DependencyGraph = {
  /**
   * 
   */
  nodes: {},

  /**
   * 
   */
  build(data) {
    // data should be from a txt file; checked before sending to build()
    data.split('\n').forEach((line) => {
      var parts = line.split(' ');
      var name = parts.shift();
      this.addNode(name, { neighbors: parts });
      parts.forEach(name => (this.addNode(name)));
    });

    // display sucess message
  },

  /**
   * 
   */
  getNodeNames() {
    return Object.keys(this.nodes).sort();
  },

  /**
   * 
   */
  getNode(name) {
    return this.nodes[name] || null;
  },

  addNode(name, options) {
    this.nodes[name] = graphNode(Object.assign({ name: name }, options));
  },

  /**
   * @returns {array}
   */
  getNeighbors(node) {
    var nodes = [];

    if (n.discoverd) {
      // throw cycle detected exception
    }
    
    nodes.push(n);
    n.discoverd = true;

    node.neighbors.forEach((n) => {
      const neighbor = this.getNode(n.name);

      if (!neighbor) {
        // throw NodeRetrievalError
        return;
      }

      if (neighbor.discoverd) {
        // throw CycleDetectedException
        return;
      }

      nodes.concat(this.getNeighbors(neighbor));
      neighbor.discoverd = true;
    });

    return nodes;
  }
};

// exports
module.exports = function () {
  return Object.assign({}, DependencyGraph, { });
}