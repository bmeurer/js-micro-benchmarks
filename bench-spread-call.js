// Copyright 2013-2018 Benedikt Meurer
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

(function() {
  function foo() {}

  TESTS.push(
      function testApplyPush() {
        "use strict";
        var newArgs = [];
        for (var i = 0; i < arguments.length; ++i) {
          newArgs.push(arguments[i]);
        }
        newArgs.push(0);
        return foo.apply(undefined, newArgs);
      },
      function testApplyPreallocate() {
        "use strict";
        var newArgs = new Array(arguments.length + 1);
        for (var i = 0; i < arguments.length; ++i) {
          newArgs[i] = arguments[i];
        }
        newArgs[arguments.length] = 0;
        return foo.apply(undefined, newArgs);
      },
      function testApplyForOf(...args) {
        var newArgs = [];
        for (const arg of args) newArgs.push(arg);
        newArgs.push(0);
        return foo.apply(undefined, newArgs);
      },
      function testApplySpread(...args) {
        return foo.apply(undefined, [...args, 0]);
      },
      function testSpreadSpread(...args) {
        return foo(...[...args, 0]);
      },
      function testSpread(...args) {
        return foo(...args, 0);
      },
      function testSpreadMethod(...args) {
        return foo.call(this, ...args, 0);
      }
  );
})();

const N = 1e7;

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) result = fn(1, 2, 3, 4);
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
