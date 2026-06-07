const questions = [
  {
    id: 1,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `console.log(a);
var a = 10;`,
    answer: "undefined",
    why: "`var` is hoisted and initialized with `undefined`.",
    crossQuestions: [
      {
        question: "What changes if `var` is replaced with `let`?",
        answer: "It throws `ReferenceError` because `let` is in TDZ before declaration."
      },
      {
        question: "Why is this not a `ReferenceError`?",
        answer: "`var` is hoisted and initialized to `undefined`, so reading it is legal."
      }
    ]
  },
  {
    id: 2,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `console.log(a);
let a = 10;`,
    answer: "ReferenceError",
    why: "`let` is hoisted but remains in the temporal dead zone until declaration executes.",
    crossQuestions: [
      {
        question: "Is `let` hoisted?",
        answer: "Yes. It is hoisted but uninitialized until execution reaches its declaration."
      },
      {
        question: "What is TDZ exactly?",
        answer: "TDZ is the time between entering scope and initializing a `let`/`const` variable."
      }
    ]
  },
  {
    id: 3,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `console.log(a);
const a = 10;`,
    answer: "ReferenceError",
    why: "`const` also stays in TDZ before initialization.",
    crossQuestions: [
      {
        question: "Why must `const` be initialized immediately?",
        answer: "`const` creates an immutable binding and cannot exist uninitialized."
      },
      {
        question: "Can a `const` object still be mutated?",
        answer: "Yes, object properties can change; only rebinding is blocked."
      }
    ]
  },
  {
    id: 4,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `var a = 5;
function test() {
  console.log(a);
  var a = 10;
}
test();`,
    answer: "undefined",
    why: "The inner `var a` is hoisted and shadows the outer `a`.",
    crossQuestions: [
      {
        question: "What is shadowing?",
        answer: "Declaring an inner variable with the same name that hides the outer variable."
      },
      {
        question: "What if the inner `var a` is removed?",
        answer: "Output becomes `5` because lookup resolves to outer `a`."
      }
    ]
  },
  {
    id: 5,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `let a = 5;
function test() {
  console.log(a);
}
test();`,
    answer: "5",
    why: "The function resolves `a` through lexical scope.",
    crossQuestions: [
      {
        question: "What is lexical scope?",
        answer: "Scope determined by where code is written, not where function is called."
      },
      {
        question: "Does JavaScript use lexical scope or dynamic scope?",
        answer: "Lexical scope."
      }
    ]
  },
  {
    id: 6,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `for (var i = 0; i < 3; i++) {}
console.log(i);`,
    answer: "3",
    why: "`var` is function-scoped, not block-scoped.",
    crossQuestions: [
      {
        question: "What happens with `let`?",
        answer: "`i` is block-scoped; outside loop access throws `ReferenceError`."
      },
      {
        question: "Why is `i` still accessible?",
        answer: "`var` is function-scoped, so loop block does not create scope for it."
      }
    ]
  },
  {
    id: 7,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `for (let i = 0; i < 3; i++) {}
console.log(typeof i);`,
    answer: '"undefined"',
    why: "`i` is block-scoped. Outside the loop it does not exist. `typeof` returns `\"undefined\"`.",
    crossQuestions: [
      {
        question: "Why does `typeof` not throw here?",
        answer: "`i` is truly undeclared outside the block; `typeof undeclared` returns `\"undefined\"`."
      },
      {
        question: "When can `typeof` still throw with `let`?",
        answer: "When identifier exists in current scope but is still in TDZ."
      }
    ]
  },
  {
    id: 8,
    topic: "Variables, Scope, Hoisting, and TDZ",
    code: `{
  var a = 1;
  let b = 2;
}
console.log(a);
console.log(typeof b);`,
    answer: `1
"undefined"`,
    why: "`var` ignores block scope, while `let` respects it.",
    crossQuestions: [
      {
        question: "Does `const` behave like `let` here?",
        answer: "Yes for scoping: both are block-scoped."
      },
      {
        question: "In which scope is `var` limited?",
        answer: "Function scope (or global if declared outside functions)."
      }
    ]
  },
  {
    id: 9,
    topic: "Functions and Execution Context",
    code: `foo();
function foo() {
  console.log("Hello");
}`,
    answer: '"Hello"',
    why: "Function declarations are fully hoisted with their implementation.",
    crossQuestions: [
      {
        question: "How is this different from a function expression?",
        answer: "Function declarations hoist full body; expressions hoist only variable binding."
      },
      {
        question: "What is hoisted here?",
        answer: "Function identifier and implementation."
      }
    ]
  },
  {
    id: 10,
    topic: "Functions and Execution Context",
    code: `foo();
var foo = function () {
  console.log("Hello");
};`,
    answer: "TypeError",
    why: "`foo` is hoisted as `undefined`, and `undefined()` throws `TypeError`.",
    crossQuestions: [
      {
        question: "Why not `ReferenceError`?",
        answer: "Identifier exists (`foo`), but value is `undefined` at call time."
      },
      {
        question: "What happens with `let foo = function () {}`?",
        answer: "Access before declaration throws `ReferenceError` due to TDZ."
      }
    ]
  },
  {
    id: 11,
    topic: "Functions and Execution Context",
    code: `function outer() {
  console.log("outer start");
  function inner() {
    console.log("inner");
  }
  inner();
  console.log("outer end");
}
outer();`,
    answer: `"outer start"
"inner"
"outer end"`,
    why: "JavaScript runs synchronous code line by line on the current call stack.",
    crossQuestions: [
      {
        question: "What execution contexts are created here?",
        answer: "Global, then `outer`, then `inner`."
      },
      {
        question: "How does the call stack look?",
        answer: "`global -> outer -> inner`, then unwinds to `global`."
      }
    ]
  },
  {
    id: 12,
    topic: "Functions and Execution Context",
    code: `var x = 1;
function a() {
  var x = 10;
  function b() {
    console.log(x);
  }
  b();
}
a();`,
    answer: "10",
    why: "`b` closes over the `x` inside `a`, not the global `x`.",
    crossQuestions: [
      {
        question: "Why does `b` not use the global `x`?",
        answer: "Closest lexical `x` is inside `a`, so it shadows global `x`."
      },
      {
        question: "What changes if local `x` is removed?",
        answer: "Output becomes `1` from global scope."
      }
    ]
  },
  {
    id: 13,
    topic: "Functions and Execution Context",
    code: `var x = 1;
function foo() {
  console.log(x);
}
function bar() {
  var x = 2;
  foo();
}
bar();`,
    answer: "1",
    why: "`foo` uses lexical scope from where it is defined, not where it is called.",
    crossQuestions: [
      {
        question: "Why is this proof of lexical scoping?",
        answer: "`foo` reads `x` where it was defined, not where called (`bar`)."
      },
      {
        question: "What would happen in a dynamically scoped language?",
        answer: "It would read caller's `x` (`2`)."
      }
    ]
  },
  {
    id: 14,
    topic: "Functions and Execution Context",
    code: `function foo() {
  var a = b = 10;
}
foo();
console.log(typeof a);
console.log(typeof b);`,
    answer: `"undefined"
"number"`,
    why: "`a` is local to `foo`, while `b` becomes an implicit global in non-strict mode.",
    crossQuestions: [
      {
        question: "What happens in strict mode?",
        answer: "`b = 10` without declaration throws `ReferenceError`."
      },
      {
        question: "Why is this considered dangerous?",
        answer: "It pollutes global scope and creates hard-to-debug side effects."
      }
    ]
  },
  {
    id: 15,
    topic: "Closures",
    code: `function outer() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
const counter = outer();
counter();
counter();`,
    answer: `1
2`,
    why: "The returned function forms a closure over `count`.",
    crossQuestions: [
      {
        question: "What exactly is a closure?",
        answer: "Function + preserved lexical environment from where it was created."
      },
      {
        question: "Where is `count` retained?",
        answer: "In closure environment referenced by returned function."
      }
    ]
  },
  {
    id: 16,
    topic: "Closures",
    code: `function createAdder(x) {
  return function (y) {
    return x + y;
  };
}
const add5 = createAdder(5);
console.log(add5(3));`,
    answer: "8",
    why: "The inner function remembers `x = 5`.",
    crossQuestions: [
      {
        question: "Why is this a closure?",
        answer: "Returned inner function uses outer variable `x` after outer returns."
      },
      {
        question: "What real-world patterns use this?",
        answer: "Factory functions, private state, currying, memoization, event handlers."
      }
    ]
  },
  {
    id: 17,
    topic: "Closures",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: `3
3
3`,
    why: "All callbacks share the same `var i`, which is `3` by execution time.",
    crossQuestions: [
      {
        question: "Why does `let` fix it?",
        answer: "Each iteration gets a fresh `i` binding."
      },
      {
        question: "Is this closure-related, event-loop-related, or both?",
        answer: "Both: closure captures `i`; event loop delays callback execution."
      }
    ]
  },
  {
    id: 18,
    topic: "Closures",
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: `0
1
2`,
    why: "`let` creates a new binding for each iteration.",
    crossQuestions: [
      {
        question: 'What does "new binding per iteration" mean?',
        answer: "Loop creates distinct `i` variable per iteration."
      },
      {
        question: "How can you solve the same problem using `var`?",
        answer: "Use IIFE: `(function(i){ setTimeout(()=>console.log(i),0); })(i);`"
      }
    ]
  },
  {
    id: 19,
    topic: "Closures",
    code: `function test() {
  let name = "Rupam";
  return function () {
    console.log(name);
  };
}
const fn = test();
fn();`,
    answer: '"Rupam"',
    why: "The inner function preserves access to `name` after `test` returns.",
    crossQuestions: [
      {
        question: "Is the variable copied or referenced through scope?",
        answer: "Referenced via lexical environment."
      },
      {
        question: "Can closures cause memory leaks?",
        answer: "Yes if large objects are captured and references persist unnecessarily."
      }
    ]
  },
  {
    id: 20,
    topic: "The `this` Keyword",
    code: `const user = {
  name: "Rupam",
  greet() {
    console.log(this.name);
  },
};
user.greet();`,
    answer: '"Rupam"',
    why: "In a method call, `this` refers to the object before the dot.",
    crossQuestions: [
      {
        question: "Is `this` determined by definition or call site?",
        answer: "For regular functions, call site; for arrows, lexical definition context."
      },
      {
        question: "What if this method is detached?",
        answer: "Loses object context; `this` becomes `undefined` (strict) or global."
      }
    ]
  },
  {
    id: 21,
    topic: "The `this` Keyword",
    code: `const user = {
  name: "Rupam",
  greet() {
    console.log(this.name);
  },
};
const fn = user.greet;
fn();`,
    answer: "undefined",
    why: "The function is called standalone, so it loses object context.",
    crossQuestions: [
      {
        question: "What is `this` in strict mode here?",
        answer: "`undefined`."
      },
      {
        question: "How can you fix this?",
        answer: "`const fn = user.greet.bind(user)` or call as `user.greet()`."
      }
    ]
  },
  {
    id: 22,
    topic: "The `this` Keyword",
    code: `function show() {
  console.log(this);
}
show();`,
    answer: "Global object (browser) or undefined (strict mode)",
    why: "Standalone regular functions use default binding.",
    crossQuestions: [
      {
        question: "Why is strict mode safer?",
        answer: "Prevents accidental global-object binding via `this`."
      },
      {
        question: "Does Node behave exactly the same?",
        answer: "Not exactly; module context differs, but strict-mode `this` rules still apply."
      }
    ]
  },
  {
    id: 23,
    topic: "The `this` Keyword",
    code: `const obj = {
  name: "Rupam",
  arrow: () => console.log(this.name),
};
obj.arrow();`,
    answer: "undefined",
    why: "Arrow functions do not have their own `this`; they capture it lexically.",
    crossQuestions: [
      {
        question: "Why should arrow functions generally not be used as methods?",
        answer: "They cannot bind `this` dynamically to object receiver."
      },
      {
        question: "What if `arrow` were a regular method?",
        answer: "`this` would point to `obj` when called as `obj.arrow()`."
      }
    ]
  },
  {
    id: 24,
    topic: "The `this` Keyword",
    code: `const obj = {
  name: "Rupam",
  regular() {
    const inner = () => console.log(this.name);
    inner();
  },
};
obj.regular();`,
    answer: '"Rupam"',
    why: "The arrow function captures `this` from `regular`, where `this === obj`.",
    crossQuestions: [
      {
        question: "Why does arrow work well inside regular methods?",
        answer: "It captures method's `this` and avoids manual `bind`."
      },
      {
        question: "What if `inner` were a regular function?",
        answer: "It would have its own `this` and likely lose object context."
      }
    ]
  },
  {
    id: 25,
    topic: "The `this` Keyword",
    code: `const obj = {
  name: "Rupam",
  greet() {
    return function () {
      console.log(this.name);
    };
  },
};
obj.greet()();`,
    answer: "undefined",
    why: "The inner regular function gets its own `this` based on its call site.",
    crossQuestions: [
      {
        question: "Why is `obj` not preserved?",
        answer: "Returned regular function is called standalone."
      },
      {
        question: "How can you preserve `this` here?",
        answer: "Return bound function, use arrow, or store `const self = this`."
      }
    ]
  },
  {
    id: 26,
    topic: "The `this` Keyword",
    code: `const obj = {
  name: "Rupam",
  greet() {
    return () => {
      console.log(this.name);
    };
  },
};
obj.greet()();`,
    answer: '"Rupam"',
    why: "The arrow function captures `this` from `greet`.",
    crossQuestions: [
      {
        question: "Why is this a common interview comparison?",
        answer: "It tests understanding of dynamic vs lexical `this`."
      },
      {
        question: "What does lexical `this` mean?",
        answer: "`this` inherited from surrounding scope at function creation."
      }
    ]
  },
  {
    id: 27,
    topic: "call, apply, bind",
    code: `function greet(city) {
  console.log(this.name + " from " + city);
}
const user = { name: "Rupam" };
greet.call(user, "Pune");`,
    answer: '"Rupam from Pune"',
    why: "`call` invokes the function immediately with an explicit `this`.",
    crossQuestions: [
      {
        question: "Difference between `call` and `apply`?",
        answer: "`call` takes comma-separated args; `apply` takes array-like args."
      },
      {
        question: "When do you use explicit binding?",
        answer: "Borrow methods, callbacks, or detached methods needing fixed context."
      }
    ]
  },
  {
    id: 28,
    topic: "call, apply, bind",
    code: `function greet(city, country) {
  console.log(this.name + " from " + city + ", " + country);
}
const user = { name: "Rupam" };
greet.apply(user, ["Pune", "India"]);`,
    answer: '"Rupam from Pune, India"',
    why: "`apply` passes arguments as an array.",
    crossQuestions: [
      {
        question: "Is `apply` still common after spread syntax?",
        answer: "Less common, but still useful for array-like argument forwarding."
      },
      {
        question: "How would this look with `call`?",
        answer: '`greet.call(user, "Pune", "India")`.'
      }
    ]
  },
  {
    id: 29,
    topic: "call, apply, bind",
    code: `function greet() {
  console.log(this.name);
}
const user = { name: "Rupam" };
const bound = greet.bind(user);
bound();`,
    answer: '"Rupam"',
    why: "`bind` returns a new function with fixed `this`.",
    crossQuestions: [
      {
        question: "Does `bind` execute immediately?",
        answer: "No, it returns a new function."
      },
      {
        question: "Why is `bind` useful in callbacks?",
        answer: "Prevents losing method context when function is passed around."
      }
    ]
  },
  {
    id: 30,
    topic: "call, apply, bind",
    code: `const person = {
  name: "Rupam",
  say() {
    console.log(this.name);
  },
};
setTimeout(person.say, 0);`,
    answer: "undefined",
    why: "Passing a method reference loses its original object context.",
    crossQuestions: [
      {
        question: "How can you fix this with `bind`?",
        answer: "`setTimeout(person.say.bind(person), 0)`."
      },
      {
        question: "Would wrapping in an arrow function fix it?",
        answer: "Yes: `setTimeout(() => person.say(), 0)`."
      }
    ]
  },
  {
    id: 31,
    topic: "Objects, References, and Mutation",
    code: `const a = { value: 1 };
const b = a;
b.value = 2;
console.log(a.value);`,
    answer: "2",
    why: "Both variables reference the same object.",
    crossQuestions: [
      {
        question: "Are objects copied by value or reference?",
        answer: "Object references are copied by value; both refs can point same object."
      },
      {
        question: "How do you create a shallow copy?",
        answer: "`{ ...obj }`, `Object.assign({}, obj)`, `[...arr]`, `slice()`."
      }
    ]
  },
  {
    id: 32,
    topic: "Objects, References, and Mutation",
    code: `const a = { value: 1 };
const b = { ...a };
b.value = 2;
console.log(a.value, b.value);`,
    answer: "1 2",
    why: "Spread creates a shallow top-level copy.",
    crossQuestions: [
      {
        question: "What happens with nested objects?",
        answer: "Nested references stay shared in shallow copies."
      },
      {
        question: "Why is it called shallow copy?",
        answer: "Only first level is duplicated."
      }
    ]
  },
  {
    id: 33,
    topic: "Objects, References, and Mutation",
    code: `const a = { nested: { value: 1 } };
const b = { ...a };
b.nested.value = 5;
console.log(a.nested.value);`,
    answer: "5",
    why: "Nested objects are still shared in a shallow copy.",
    crossQuestions: [
      {
        question: "How do you deep copy safely?",
        answer: "Prefer `structuredClone` for supported data types."
      },
      {
        question: "What are the limits of `JSON.parse(JSON.stringify(obj))`?",
        answer: "Loses functions, `Date`, `Map`, `Set`, `undefined`, circular refs."
      }
    ]
  },
  {
    id: 34,
    topic: "Objects, References, and Mutation",
    code: `const obj = { a: 1 };
obj.a = 2;
console.log(obj.a);`,
    answer: "2",
    why: "`const` prevents rebinding, not object mutation.",
    crossQuestions: [
      {
        question: "What exactly does `const` freeze?",
        answer: "Variable binding only, not object internals."
      },
      {
        question: "How do you make objects less mutable?",
        answer: "`Object.freeze` (shallow), deep-freeze utility, immutable patterns."
      }
    ]
  },
  {
    id: 35,
    topic: "Type Coercion and Equality",
    code: `console.log("5" + 1);
console.log("5" - 1);`,
    answer: `"51"
4`,
    why: "`+` may concatenate strings; `-` forces numeric coercion.",
    crossQuestions: [
      {
        question: "Why do operators coerce differently?",
        answer: "ECMAScript defines different abstract operations per operator."
      },
      {
        question: "What are common coercion traps?",
        answer: "`[] == false`, `'5' + 1` vs `'5' - 1`, `null == undefined`."
      }
    ]
  },
  {
    id: 36,
    topic: "Type Coercion and Equality",
    code: `console.log(false == 0);
console.log(false === 0);`,
    answer: `true
false`,
    why: "`==` coerces types; `===` does not.",
    crossQuestions: [
      {
        question: "Why is `==` risky?",
        answer: "Implicit coercion can hide bugs and produce surprising truths."
      },
      {
        question: "Are there acceptable uses of `==`?",
        answer: "Sometimes `value == null` to check `null` or `undefined` together."
      }
    ]
  },
  {
    id: 37,
    topic: "Type Coercion and Equality",
    code: `console.log(null == undefined);
console.log(null === undefined);`,
    answer: `true
false`,
    why: "Under loose equality, `null` equals only `undefined`.",
    crossQuestions: [
      {
        question: "Why is this a special case?",
        answer: "Spec explicitly defines loose equality between `null` and `undefined` only."
      },
      {
        question: "How do you compare nullable values safely?",
        answer: "Use `value === null`, `value === undefined`, or `value == null` intentionally."
      }
    ]
  },
  {
    id: 38,
    topic: "Type Coercion and Equality",
    code: `console.log([] == false);
console.log([] === false);`,
    answer: `true
false`,
    why: "Loose equality triggers coercion on both sides.",
    crossQuestions: [
      {
        question: "Why are coercion questions famous in interviews?",
        answer: "They quickly reveal depth of JS fundamentals."
      },
      {
        question: "Should production code rely on this?",
        answer: "No, prefer explicit checks and strict equality."
      }
    ]
  },
  {
    id: 39,
    topic: "Type Coercion and Equality",
    code: `console.log(typeof null);
console.log(typeof undefined);`,
    answer: `"object"
"undefined"`,
    why: '`typeof null` returning `"object"` is a historic JavaScript bug.',
    crossQuestions: [
      {
        question: "How do you actually check for `null`?",
        answer: "`value === null`."
      },
      {
        question: "Why was this not changed?",
        answer: "Backward compatibility across the web ecosystem."
      }
    ]
  },
  {
    id: 40,
    topic: "Type Coercion and Equality",
    code: `console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));`,
    answer: `false
true`,
    why: "`NaN` is not equal to itself under strict equality.",
    crossQuestions: [
      {
        question: "How do you safely check for `NaN`?",
        answer: "`Number.isNaN(value)`."
      },
      {
        question: "Why does `Object.is` differ?",
        answer: "It uses SameValue semantics where `NaN` equals `NaN`."
      }
    ]
  },
  {
    id: 41,
    topic: "Arrays and Array Methods",
    code: `const arr = [1, 2, 3];
const result = arr.map((num) => num * 2);
console.log(result);
console.log(arr);`,
    answer: `[2, 4, 6]
[1, 2, 3]`,
    why: "`map` returns a new array and does not mutate the original.",
    crossQuestions: [
      {
        question: "Which array methods mutate?",
        answer: "`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`."
      },
      {
        question: "When do you prefer `map` over `forEach`?",
        answer: "When transforming data to a new array."
      }
    ]
  },
  {
    id: 42,
    topic: "Arrays and Array Methods",
    code: `const arr = [1, 2, 3, 4];
const result = arr.filter((num) => num % 2 === 0);
console.log(result);`,
    answer: "[2, 4]",
    why: "`filter` keeps elements with truthy callback results.",
    crossQuestions: [
      {
        question: "Does `filter` mutate?",
        answer: "No, returns a new array."
      },
      {
        question: "How is `filter` different from `find`?",
        answer: "`filter` returns all matches; `find` returns first match or `undefined`."
      }
    ]
  },
  {
    id: 43,
    topic: "Arrays and Array Methods",
    code: `const arr = [1, 2, 3, 4];
const result = arr.reduce((acc, num) => acc + num, 0);
console.log(result);`,
    answer: "10",
    why: "`reduce` accumulates values into one output.",
    crossQuestions: [
      {
        question: "Why is the initial value important?",
        answer: "Avoids edge cases and ensures predictable accumulator type."
      },
      {
        question: "What if the initial value is omitted?",
        answer: "First element becomes accumulator; empty array throws `TypeError`."
      }
    ]
  },
  {
    id: 44,
    topic: "Arrays and Array Methods",
    code: `const arr = [1, 2, 3];
const result = arr.forEach((num) => num * 2);
console.log(result);`,
    answer: "undefined",
    why: "`forEach` is for side effects and returns `undefined`.",
    crossQuestions: [
      {
        question: "Why do many candidates confuse `forEach` and `map`?",
        answer: "Similar callback style, but return behavior differs."
      },
      {
        question: "When is `forEach` the right choice?",
        answer: "For side effects: logging, DOM ops, mutating external state."
      }
    ]
  },
  {
    id: 45,
    topic: "Arrays and Array Methods",
    code: `const arr = [1, 2, 3, 4];
console.log(arr.find((num) => num > 2));
console.log(arr.some((num) => num > 4));
console.log(arr.every((num) => num > 0));`,
    answer: `3
false
true`,
    why: "`find` returns the first match, `some` checks if any match, and `every` checks if all match.",
    crossQuestions: [
      {
        question: "What does `findIndex` return?",
        answer: "Index of first match, else `-1`."
      },
      {
        question: "Which of these short-circuit early?",
        answer: "`find`, `some`, and `every` short-circuit."
      }
    ]
  },
  {
    id: 46,
    topic: "Arrays and Array Methods",
    code: `const arr = [1, 2, 3];
arr.push(4);
console.log(arr);`,
    answer: "[1, 2, 3, 4]",
    why: "`push` mutates the original array.",
    crossQuestions: [
      {
        question: "Which common methods mutate arrays?",
        answer: "`push/pop/shift/unshift/splice/sort/reverse`."
      },
      {
        question: "How do you add immutably?",
        answer: "`[...arr, newItem]` or `arr.concat(newItem)`."
      }
    ]
  },
  {
    id: 47,
    topic: "Arrays and Array Methods",
    code: `const arr = [1, 2, 3];
const copy = [...arr, 4];
console.log(arr);
console.log(copy);`,
    answer: `[1, 2, 3]
[1, 2, 3, 4]`,
    why: "Spread creates a new array.",
    crossQuestions: [
      {
        question: "Why is immutability important in React?",
        answer: "Enables predictable state updates and efficient change detection."
      },
      {
        question: "Is spread a deep clone?",
        answer: "No, shallow clone only."
      }
    ]
  },
  {
    id: 48,
    topic: "Destructuring, Spread, and Rest",
    code: `const arr = [10, 20, 30];
const [a, b] = arr;
console.log(a, b);`,
    answer: "10 20",
    why: "Array destructuring assigns by position.",
    crossQuestions: [
      {
        question: "How do you skip elements?",
        answer: "`const [first, , third] = arr`."
      },
      {
        question: "What if values are missing?",
        answer: "Variables become `undefined` unless defaults are provided."
      }
    ]
  },
  {
    id: 49,
    topic: "Destructuring, Spread, and Rest",
    code: `const obj = { name: "Rupam", age: 27 };
const { name, age } = obj;
console.log(name, age);`,
    answer: '"Rupam" 27',
    why: "Object destructuring assigns by property name.",
    crossQuestions: [
      {
        question: "How do you rename destructured properties?",
        answer: "`const { name: userName } = obj`."
      },
      {
        question: "What if the property is missing?",
        answer: "Result is `undefined` unless default is specified."
      }
    ]
  },
  {
    id: 50,
    topic: "Destructuring, Spread, and Rest",
    code: `const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log(a);
console.log(rest);`,
    answer: `1
{ b: 2, c: 3 }`,
    why: "Rest collects remaining properties into a new object.",
    crossQuestions: [
      {
        question: "What is the difference between rest and spread?",
        answer: "Rest collects many into one; spread expands one into many."
      },
      {
        question: "Can rest appear anywhere?",
        answer: "No, rest must be last in destructuring/parameter lists."
      }
    ]
  },
  {
    id: 51,
    topic: "Destructuring, Spread, and Rest",
    code: `function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3));`,
    answer: "6",
    why: "Rest parameters gather arguments into an array.",
    crossQuestions: [
      {
        question: "How is rest different from `arguments`?",
        answer: "Rest is real array and available in arrows; `arguments` is array-like."
      },
      {
        question: "Why is rest preferred?",
        answer: "Cleaner syntax, array methods directly usable, predictable behavior."
      }
    ]
  },
  {
    id: 52,
    topic: "Prototypes and Inheritance",
    code: `function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log("Hi " + this.name);
};
const p = new Person("Rupam");
p.sayHi();`,
    answer: '"Hi Rupam"',
    why: "`p` finds `sayHi` through `Person.prototype`.",
    crossQuestions: [
      {
        question: "Where is `sayHi` stored?",
        answer: "On `Person.prototype`, shared by all instances."
      },
      {
        question: "Why is this memory efficient?",
        answer: "One function object is reused across instances."
      }
    ]
  },
  {
    id: 53,
    topic: "Prototypes and Inheritance",
    code: `function Person(name) {
  this.name = name;
}
const p = new Person("Rupam");
console.log(p.__proto__ === Person.prototype);`,
    answer: "true",
    why: "Objects created with `new` link to the constructor's `prototype`.",
    crossQuestions: [
      {
        question: "Difference between `prototype` and `__proto__`?",
        answer: "`prototype` belongs to constructor; `__proto__` is instance link to prototype."
      },
      {
        question: "Why is this relationship important?",
        answer: "Explains inheritance and property/method lookup behavior."
      }
    ]
  },
  {
    id: 54,
    topic: "Prototypes and Inheritance",
    code: `function A() {}
A.prototype.x = 10;
const obj = new A();
console.log(obj.x);`,
    answer: "10",
    why: "Property lookup walks the prototype chain.",
    crossQuestions: [
      {
        question: "What happens if `obj.x = 20` later?",
        answer: "Creates own `x` on `obj`, shadowing prototype `x`."
      },
      {
        question: "What is shadowing in prototype lookup?",
        answer: "Own property with same key hides prototype property."
      }
    ]
  },
  {
    id: 55,
    topic: "Prototypes and Inheritance",
    code: `class Animal {
  speak() {
    console.log("Animal speaks");
  }
}
class Dog extends Animal {}
const d = new Dog();
d.speak();`,
    answer: '"Animal speaks"',
    why: "`extends` uses prototype-based inheritance under the hood.",
    crossQuestions: [
      {
        question: "Are JS classes truly class-based?",
        answer: "Syntax is class-like, but runtime inheritance is prototype-based."
      },
      {
        question: "What prototype relationship does `extends` create?",
        answer: "Subclass prototype links to superclass prototype."
      }
    ]
  },
  {
    id: 56,
    topic: "Functions, Parameters, and Famous Traps",
    code: `function test(a, b = 2) {
  console.log(a, b);
}
test(1);`,
    answer: "1 2",
    why: "Default parameters are used when an argument is `undefined`.",
    crossQuestions: [
      {
        question: "What if `null` is passed?",
        answer: "Default not used; output would be `1 null` if second arg is `null`."
      },
      {
        question: "When are default values evaluated?",
        answer: "At call time, only when argument is `undefined`."
      }
    ]
  },
  {
    id: 57,
    topic: "Functions, Parameters, and Famous Traps",
    code: `function test(a, a) {
  console.log(a);
}
test(1, 2);`,
    answer: "2",
    why: "In non-strict mode, later duplicate parameters overwrite earlier ones.",
    crossQuestions: [
      {
        question: "Is this allowed in strict mode?",
        answer: "No, duplicate parameters cause syntax error."
      },
      {
        question: "Why is this a bad pattern?",
        answer: "Ambiguous intent and error-prone maintenance."
      }
    ]
  },
  {
    id: 58,
    topic: "Functions, Parameters, and Famous Traps",
    code: `function test() {
  console.log(arguments.length);
}
test(1, 2, 3);`,
    answer: "3",
    why: "`arguments` contains all passed arguments for regular functions.",
    crossQuestions: [
      {
        question: "Why don't arrow functions have `arguments`?",
        answer: "They inherit `arguments` from nearest non-arrow scope."
      },
      {
        question: "Why is rest parameter better?",
        answer: "Explicit, type-friendly, and an actual array."
      }
    ]
  },
  {
    id: 59,
    topic: "Functions, Parameters, and Famous Traps",
    code: `console.log(1 + "2" + 3);
console.log(1 + 2 + "3");`,
    answer: `"123"
"33"`,
    why: "Evaluation is left to right; once string concatenation begins, remaining `+` operations concatenate strings.",
    crossQuestions: [
      {
        question: "Why are these outputs different?",
        answer: "Left-to-right evaluation changes when string coercion begins."
      },
      {
        question: "How do parentheses change the result?",
        answer: 'They force precedence, e.g. `(1 + 2) + "3"` gives `"33"`.'
      }
    ]
  },
  {
    id: 60,
    topic: "Functions, Parameters, and Famous Traps",
    code: `console.log([] + []);
console.log([] + {});
console.log({} + []);`,
    answer: `""
"[object Object]"
0 or "[object Object]" depending on parsing context`,
    why: "Arrays and objects coerce to primitives in surprising ways. `{}` can also be parsed as a block depending on context.",
    crossQuestions: [
      {
        question: "Why is this a parser/context trap?",
        answer: "`{}` can parse as block statement, altering expression evaluation."
      },
      {
        question: "Should you memorize or reason through this one?",
        answer: "Reason through coercion rules and parser context; avoid relying on such code."
      }
    ]
  },
  {
    id: 61,
    topic: "Event Loop and Async",
    code: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`,
    answer: `"A"
"C"
"B"`,
    why: "Synchronous code runs first. Timer callbacks run after the current call stack is empty.",
    crossQuestions: [
      {
        question: "Why does 0ms not mean immediate execution?",
        answer: "Timer callback runs only after current stack and microtasks finish."
      },
      {
        question: "What queue does `setTimeout` use?",
        answer: "Macrotask/task queue."
      }
    ]
  },
  {
    id: 62,
    topic: "Event Loop and Async",
    code: `setTimeout(() => console.log("A"), 0);
Promise.resolve().then(() => console.log("B"));
console.log("C");`,
    answer: `"C"
"B"
"A"`,
    why: "Synchronous code runs first, then microtasks, then macrotasks.",
    crossQuestions: [
      {
        question: "What is a microtask?",
        answer: "High-priority queue jobs like `Promise.then` callbacks."
      },
      {
        question: "Why do promises run before timers?",
        answer: "Event loop drains microtasks before processing next macrotask."
      }
    ]
  },
  {
    id: 63,
    topic: "Event Loop and Async",
    code: `console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");`,
    answer: `"start"
"end"
"promise"
"timeout"`,
    why: "The event loop flushes microtasks after the current synchronous code and before the next macrotask.",
    crossQuestions: [
      {
        question: "What happens to the microtask queue after each task?",
        answer: "It is drained completely before next macrotask."
      },
      {
        question: "Why is this question so common?",
        answer: "It validates understanding of async ordering and runtime model."
      }
    ]
  },
  {
    id: 64,
    topic: "Event Loop and Async",
    code: `async function test() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}
console.log(3);
test();
console.log(4);`,
    answer: `3
1
4
2`,
    why: "`test()` runs synchronously until `await`, then resumes in a microtask.",
    crossQuestions: [
      {
        question: "Does `await` block the thread?",
        answer: "No. It pauses only the async function continuation."
      },
      {
        question: "How is `await` related to promises internally?",
        answer: "`await expr` is roughly promise resolution plus `.then` continuation."
      }
    ]
  }
];

export default questions;

export const topics = [
  "Variables, Scope, Hoisting, and TDZ",
  "Functions and Execution Context",
  "Closures",
  "The `this` Keyword",
  "call, apply, bind",
  "Objects, References, and Mutation",
  "Type Coercion and Equality",
  "Arrays and Array Methods",
  "Destructuring, Spread, and Rest",
  "Prototypes and Inheritance",
  "Functions, Parameters, and Famous Traps",
  "Event Loop and Async"
];
