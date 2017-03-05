const test = require('tap').test;
const Password = require('../../src/lib/Password');

test('Default password is 32 characters', (t) => {
  const password = Password.generate();
  t.equals(password.length, 32);

  t.end();
});

test('Password can change lengths', (t) => {
  var password = Password.generate({ length: 1 });
  t.equals(password.length, 1);

  password = Password.generate({ length: 1000 });
  t.equals(password.length, 1000);

  t.end();
});

test('Custom password should only contain numbers', (t) => {
  var password = Password.generate({ 
    length: 10000,
    lowerCase: false,
    upperCase: false,
    special: false
  });

  password.split('').forEach((char) => {
    t.equals(/\d/.test(char), true);
  })


  t.end();
});

test('Custom password should never contain numbers', (t) => {
  var password = Password.generate({ 
    length: 10000,
    numbers: false
  });

  password.split('').forEach((char) => {
    t.equals(/\d/.test(char), false);
  })


  t.end();
});

