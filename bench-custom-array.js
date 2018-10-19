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

const myForEach = (function() {
  "use strict";

  return function myForEach(callback, thisArg) {
    const array = %_ToObject(this);
    const length = %_ToLength(array.length);

    if (typeof callback !== 'function')
      throw new TypeError('Array.prototype.myForEach callback must be a function');

    for (let i = 0; i < length; ++i) {
      if (i in array) %_Call(callback, thisArg, array[i], i, array);
    }
  };
})();

const TESTS = [];

Object.defineProperty(Array.prototype,
    'myForEach', { value: myForEach });

(function() {
  TESTS.push(
      function testForEach(a) {
        var s = 0;
        a.forEach(x => s += x);
        return s;
      },
      function testMyForEach(a) {
        var s = 0;
        a.myForEach(x => s += x);
        return s;
      },
  );
})();

const N = 2e7;
const a = [1, 2, 3, 4, 5, 6, 7, 8];

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) result = fn(a);
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

