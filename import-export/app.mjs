import './module.mjs'; // side-effects

// === Import specific things
import sayHello from './module.mjs';
sayHello('Wade');

// === Can be named anything
import hello from './module.mjs';
hello('Wade');

// === Doesnt work if there is no default
import sayHello from './module.mjs';
sayHello('Wade');

// === Import non defaults
import { sayHello } from './module.mjs';
sayHello('Wade');

// === Must be correctly named
import { hello } from './module.mjs';
hello('Wade');

import { sayHello as hello } from './module.mjs';
hello('Wade');

// === Import multiple things
import {
  sayHello as hello,
  sayGoodbye
} from './module.mjs';
hello('Wade');
sayGoodbye('DP');

// === Import unknown things
import * as mod from './module.mjs';
console.log(mod);
mod.sayHello('Wade');
mod.sayGoodbye('DP');

// === Import unknown things
import * as mod from './module.mjs';
console.log(mod);

// === How about default AND multiple?
import something, {
  sayHello
} from './module.mjs';

something();
sayHello('Wade');

// === How about default AND multiple unknown?
import something, * as mod from './module.mjs';
something();
console.log(mod);

// === How about default AND multiple unknown?
import * as mod from './transitive.mjs';
console.log(mod);

import something from './transitive.mjs';
console.log(something);

import something, * as mod from './transitive.mjs';
console.log(something);
console.log(mod);
