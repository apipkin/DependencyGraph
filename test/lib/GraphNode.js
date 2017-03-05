const test = require('tap').test;
const GraphNode = require('../../src/lib/GraphNode').Factory;

test('An empty graph node has an empty name', (t) => {
  var node = GraphNode();
  t.equals(node.name, null);

  t.end();
});

test('An empty graph node returns an empty string when `.toString` is called', (t) => {
  var node = GraphNode();
  t.equals(node.toString(), '');

  t.end();
});

test('A graphNode takes a primer object', (t) => {
  const NAME = 'Sample';
  var node = GraphNode({ name: NAME });
  t.equals(node.name, NAME);
  t.equals(node.toString(), NAME);

  t.end();
});

test('A graph node starts out undiscovered', (t) => {
  var node = GraphNode();
  t.equals(node.isDiscovered(), false);

  t.end();
});

test('GraphNode discovery can be toggled', (t) => {
  var node = GraphNode();
  t.equals(node.isDiscovered(), false);
  
  node.setDiscovered(true);
  t.equals(node.isDiscovered(), true);
  
  node.setDiscovered(false);
  t.equals(node.isDiscovered(), false);

  t.end();
});

test('A graph node has zero inbound nodes', (t) => {
  var node = GraphNode();
  t.deepEquals(node.getInbound(), []);

  t.end();
});
