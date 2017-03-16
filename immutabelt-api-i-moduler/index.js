function transformer(fns = []) {
  return { add, remove, value };

  function add(fn) {
    return transformer(fns.concat(fn));
  }
  function remove(fn) {
    return transformer(fns.filter(f => f !== fn));
  }
  function value(input) {
    return fns.reduce((prev, fn) => fn(prev), input);
  }
}

let fn10 = v => v + 10;
let t = transformer()
  .add(v => v * 2)
  .add(fn10)
  .add(v => 'value: ' + v);

let t2 = t.remove(fn10);
console.log(t.value(2));
console.log(t2.value(2));
