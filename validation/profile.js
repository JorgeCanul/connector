const Validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = valiDatorRegister = (data) => {
  let errors = {};

  if(!Validator.isLength(data.name, {min: 3, max: 30})) {
    errors.name = 'Name must be between 3 and 30 characters';
  }

  if(isEmpty(data.name)) {
    errors.name = 'Name is Required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Not a valid email';
  }
  if(isEmpty(data.email)) {
    errors.name = 'Email is Required';
  }

  if(!Validator.isLength(data.password, {min: 6, max: 20})) {
    errors.password = 'Password must be between 6 and 20 characters';

  }
  if(isEmpty(data.password)) {
    errors.password = 'Password is Required';
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password must match';

  }
  if(isEmpty(data.password2)) {
    errors.password2 = 'Verife password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

};
