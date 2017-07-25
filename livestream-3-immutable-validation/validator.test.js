const validation = require('./validator');

describe('validator', function() {
  it('should always validate truthy when no validation predicates are defined', function() {
    expect(validation.valid().isValid).toBeTruthy();
  });

  it('should mark empty values as invalid', function() {
    let validator = validation.notEmpty('foo');
    expect(validator.valid({ foo: 'Hello, World' }).isValid).toBeTruthy();

    validator = validation.notEmpty('foo').notEmpty('bar');
    expect(validator.valid({ foo: 'Hello, World' }).isValid).toBeFalsy();
  });

  it('should return message of what is invalid', function() {
    let validator = validation.notEmpty('foo');
    expect(validator.valid({}).messages).toEqual({
      foo: ['foo is empty']
    });

    validator = validation.notEmpty('foo').notEmpty('bar');
    expect(validator.valid({}).messages).toEqual({
      foo: ['foo is empty'],
      bar: ['bar is empty']
    });
  });

  it('should accept custom validation functions', function() {
    function allNumbers(value) {
      return /^\d+$/.test(value);
    }
    let validator = validation.is('foo', allNumbers, 'foo expects all numbers');
    expect(validator.valid({ foo: 'Hello, World' }).messages).toEqual({
      foo: ['foo expects all numbers']
    });
  });

  it('should accept custom validation functions and built in functions', function() {
    function allNumbers(value) {
      return /^\d+$/.test(value);
    }
    let validator = validation
      .is('foo', allNumbers, 'foo expects all numbers')
      .notEmpty('bar');
    expect(validator.valid({ foo: 'Hello, World' }).messages).toEqual({
      foo: ['foo expects all numbers'],
      bar: ['bar is empty']
    });
  });

  it('should have validator immutable', function() {
    function allNumbers(value) {
      return /^\d+$/.test(value);
    }
    const valid1 = validation.is('foo', allNumbers, 'foo expects all numbers');

    const valid2 = valid1.notEmpty('bar');

    expect(valid1.valid({ foo: '123' }).isValid).toBeTruthy();

    expect(valid2.valid({ foo: '123' }).messages).toEqual({
      bar: ['bar is empty']
    });
  });

  it('should accept negated predicates', function() {
    function allNumbers(value) {
      return /^\d+$/.test(value);
    }
    const valid1 = validation.not(
      'foo',
      allNumbers,
      'foo should not be numbers'
    );
    expect(valid1.valid({ foo: '123' }).isValid).toBeFalsy();
  });
});
