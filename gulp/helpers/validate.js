'use strict';

module.exports = {
  selectOne: (value) => value.length > 0 ? true : 'Please select at least one option',
  notEmpty: (value) => value.length > 0 ? true : 'Please fill this value',
  phone: (value) => value.match(/^\+[0-9]+$/) ? true : 'Please an international phone number (+12345678910)'
};
