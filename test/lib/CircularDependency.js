const test = require('tap').test;
const CircularDependency = require('../../src/lib/CircularDependency');

test('CircularDependency is a custom error', (t) => {
    t.isA(new CircularDependency(), 'object');
    t.isA(new CircularDependency(), 'Error');
    t.isA(new CircularDependency(), Error);

    t.end();
});

test('CircularDependency has a default meessage', (t) => {
    t.equals( (new CircularDependency()).message, 'A circular dependency was detected.');

    t.end();
});

test('CircularDependency can have a custom message', (t) => {
    t.equals( (new CircularDependency('Nope')).message, 'Nope');

    t.end();
});

