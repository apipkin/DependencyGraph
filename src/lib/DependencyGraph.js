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
  getInboundNodes(name) {
    this.resetNodes();
    console.log(this.walkInboud(name));
    this.resetNodes();
    return this.walkInboud(name).join(' ');
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

  /**
   * 
   */
  addNode(name, options) {
    var nodePrimer = (this.nodes[name] || { name: name });
    this.nodes[name] = graphNode(Object.assign(nodePrimer, options));  
  },

  /**
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
   * 
   */
  dehydrate: function () {
    return JSON.stringify(this.nodes);
  },

  /**
   * 
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
  return Object.assign({}, DependencyGraph, { });
}