const FS = require('fs');
const test = require('tap').test;
const DGraph = require('../../src/lib/DependencyGraph');

const simpleGraph = FS.readFileSync('./test/graph-simple.txt');
const fullGraph = FS.readFileSync('./test/graph.txt');
const cyclicGraph = FS.readFileSync('./test/graph-cyclic.txt');

test('A default graph has zero nodes', (t) => {
  const graph = DGraph();

  t.deepEquals(graph.nodes, {});

  t.end();
});

test('Building with data will populate nodes', (t) => {
  const graph = DGraph();
  graph.build(simpleGraph);

  t.deepEquals(graph.getNodeNames(), ['ClassA', 'ClassB']);

  t.end();
});

test('One graph can hydrate another graph through serialization', (t) => {
  const graphA = DGraph();
  graphA.build(fullGraph);

  const graphB = DGraph();

  t.deepEquals(graphB.getNodeNames(), []);

  graphB.hydrate(graphA.serialize());

  t.deepEquals(graphB.getNodeNames(), graphA.getNodeNames());

  t.end();
});

test('Walking the inbound nodes will return a STRING', (t) => {
  const graph = DGraph();
  graph.build(simpleGraph);

  t.equals(graph.getInboundNodes('ClassA'), 'ClassA ClassB');
  t.equals(graph.getInboundNodes('ClassB'), 'ClassB');
  
  t.end();
});

test('Graph throws and error when requesting an invalid node', (t) => {
  const graph = DGraph();
  graph.build(simpleGraph);

  t.throws(() => graph.getInboundNodes('ClassC'), 'Node cannot be found.');
  
  t.end();
});

test('Graph throws and error when encountering a cyclic dependency', (t) => {
  const graph = DGraph();

  graph.build(cyclicGraph.toString());

  t.throws(() => graph.getInboundNodes('ClassA'), 'A circular dependency was detected.');
  
  t.end();
});

