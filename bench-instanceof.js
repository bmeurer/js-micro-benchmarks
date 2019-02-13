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

const A = class A {};
const B = class B extends A {};
const C = class C {};
const D = class D extends A {};
const E = class E extends D {};
const F = class F extends E {};
const G = class G extends F {};
const H = class H extends C {};

(function() {
  TESTS.push(
      function instanceOf(a) {
        return a instanceof A;
      },
      function typeOf(a) {
        return typeof a._addParent === 'function';
      }
  );
})();

const N = 1e6;
const objs = [{}, [], new A(), new B(), new C(), new D(), new E(), new F(), new G(), new H()];

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

for (var j = 0; j < TESTS.length; ++j) {
  var startTime = Date.now();
  test(TESTS[j]);
  console.log(TESTS[j].name + ':', (Date.now() - startTime), 'ms.');
}
