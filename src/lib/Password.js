/**
 * 
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
 * @param {Object} options Available options for password configurations
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
