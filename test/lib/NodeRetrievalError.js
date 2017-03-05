const test = require('tap').test;
const NodeRetrievalError = require('../../src/lib/NodeRetrievalError');

test('NodeRetrievalError is a custom error', (t) => {
    t.isA(new NodeRetrievalError(), 'object');
    t.isA(new NodeRetrievalError(), 'Error');
    t.isA(new NodeRetrievalError(), Error);

    t.end();
});

test('NodeRetrievalError has a default meessage', (t) => {
    t.equals( (new NodeRetrievalError()).message, 'Node cannot be found.');

    t.end();
});

test('NodeRetrievalError can have a custom message', (t) => {
    t.equals( (new NodeRetrievalError('Nope')).message, 'Nope');

    t.end();
});

