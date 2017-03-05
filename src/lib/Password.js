/**
 * @property {Object} codes List of character codes by group
 */
const codes = {
  lower: arrayFromRange(97, 122),
  upper: arrayFromRange(65, 90),
  numbers: arrayFromRange(48, 57),
  special: arrayFromRange(33, 47).concat(  arrayFromRange(58, 64), 
                                           arrayFromRange(91, 96), 
                                           arrayFromRange(123, 126)  )
};

/**
 * Creates an array of numbers starting with the minimum value to and including 
 * the maximum value.
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @returns {Array}
 */
function arrayFromRange(min, max) {
  var nums = [];

  while (min <= max) {
    nums.push(min);
    min++;
  }

  return nums;
}

/**
 * Generates a string of characters based on options. Options can contain the 
 *   `length` of the string as well as what characters are used (`numbers`, 
 *   `lowerCase`, `upperCase`, and `special`). Default is all characters with a 
 *   length of 32.
 * @param {Object} [options] Available options for password configurations
 * @returns {String}
 */
function generate(options) {
  options = Object.assign({
    length: 32,
    numbers: true,
    lowerCase: true,
    upperCase: true,
    special: true
  }, options);

  var password = '';
  var charCodes = [];

  if (options.lowerCase) charCodes = charCodes.concat(codes.lower);
  if (options.upperCase) charCodes = charCodes.concat(codes.upper);
  if (options.numbers)   charCodes = charCodes.concat(codes.numbers);
  if (options.special)   charCodes = charCodes.concat(codes.special);

  while (options.length) {
    password += String.fromCharCode(charCodes[Math.floor(Math.random() * (charCodes.length  - 1))]);
    options.length--;
  }

  return password;
}

// exports
module.exports = {
  generate: generate
};
