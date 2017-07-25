function isNotEmpty(value) {
  return typeof value !== 'undefined' && value !== '';
}

function validate(key, predicate, message, obj) {
  if (!predicate(obj[key])) {
    return { isValid: false, key, message };
  }
  return { isValid: true };
}

function partial(fns, ...args) {
  return function(...innerArgs) {
    return fns(...args.concat(innerArgs));
  };
}

function generateValidationObject(fns, obj) {
  const messages = fns.reduce(function(prev, pred) {
    const { isValid, key, message } = pred(obj);
    if (isValid) return prev;

    const hasPrevValidation = Array.isArray(prev[key]);
    prev[key] = hasPrevValidation ? prev[key].concat(message) : [message];
    return prev;
  }, {});

  return {
    messages,
    isValid: Object.keys(messages).length === 0
  };
}

function not(fn) {
  return function(...args) {
    return !fn(...args);
  };
}

function validator(fns = []) {
  function is(key, pred, message) {
    const validationFn = partial(validate, key, pred, message);
    return validator(fns.concat(validationFn));
  }

  return {
    notEmpty(key) {
      return is(key, isNotEmpty, `${key} is empty`);
    },

    is,

    not(key, pred, message) {
      return is(key, not(pred), message);
    },

    valid: partial(generateValidationObject, fns)
  };
}

module.exports = validator();
