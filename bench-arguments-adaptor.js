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

function foo(x) {
  "use strict";
  return x;
}

(function() {
  TESTS.push(
      function callUnderApplication() {
        foo();
        foo();
        foo();
        foo();
        foo();
        foo();
        foo();
        foo();
      },
      function callOverApplication1() {
        foo(null, null);
        foo(null, null);
        foo(null, null);
        foo(null, null);
        foo(null, null);
        foo(null, null);
        foo(null, null);
        foo(null, null);
      },
      function callOverApplication2() {
        foo(null, null, null);
        foo(null, null, null);
        foo(null, null, null);
        foo(null, null, null);
        foo(null, null, null);
        foo(null, null, null);
        foo(null, null, null);
        foo(null, null, null);
      }
  );
})();

const N = 1e7;

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) {
    result = fn();
  }
  return result;
}
test(x => x);  // Pollute call feedback early on.

for (var j = 0; j < TESTS.length; ++j) {
  test(TESTS[j]);
}

for (var j = 0; j < TESTS.length; ++j) {
  var startTime = Date.now();
  test(TESTS[j]);
  console.log(`${TESTS[j].name}: ${Date.now() - startTime} ms.`);
}
