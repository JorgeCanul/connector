const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateLogin = (data) => {
  const errors = {};
  if (!Validator.isEmail(data.email)){
    errors.email = 'Invalid email';
  }

  if (isEmpty(data.email)){
    errors.email = 'Email is required';
  }

  if (isEmpty(data.password)){
    errors.password = 'Password is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  }
};