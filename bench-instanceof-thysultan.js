// Copyright 2013-2019 Benedikt Meurer
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     <https://www.apache.org/licenses/LICENSE-2.0>
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

if (typeof console === 'undefined') console = {log:print};

const TESTS = [];

const A = function () {};
A.prototype = Object.create(null);

(function() {
    const O = Object;
    const hop = Object.hasOwnProperty
  TESTS.push(
      function instanceOf(a) {
        return a instanceof O;
      },
      function nullOrConstructorOf(a) {
          return a == null || a.constructor === O;
      },
      function instanceOfOrNull(a) {
          return a instanceof O || a == null;
      },
      function nullOrInstanceOf(a) {
          return a == null || a instanceof O;
      },
      function nullOrTypeofAndInstanceOf(a) {
          return a == null || (typeof a === 'object' && a instanceof O);
      },
      function TypeofAndNullOrInstanceOf(a) {
          return typeof a === 'object' && (a == null || a instanceof O);
      },
      function nullOrhasOwnProperty (a) {
          return a == null || hop.call(a, 'constructor')
      }
  );
})();

const N = 1e6;
const objs = [
    {a: 1}, // props
    {b: 1}, // props
    {c: 1}, // props
    [], // children
    'abc', // child
    1234, // child
    null, // props/child
    undefined, // props/child
    new A(), // vnode
    new A(), // vnode
    new A(), // vnode
    new A(), // vnode
    new A(), // vnode
    new A(), // vnode
    new A(), // vnode
    new A(), // vnode
];

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) {
    for (var j = 0; j < objs.length; ++j) {
      result = fn(objs[j]);
    }
  }
  return result;
}

test(x => x);

for (var j = 0; j < TESTS.length; ++j) {
  test(TESTS[j]);
}

const perf = performance

for (var j = 0; j < TESTS.length; ++j) {
  var startTime = perf.now();
  test(TESTS[j]);
  console.log(TESTS[j].name + ':', (perf.now() - startTime), 'ms.');
}
