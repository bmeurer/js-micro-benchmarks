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
      function forLoop(a, r) {
        for (var i = 0; i < a.length; ++i) {
          const x = a[i];
          if (x >= r.lo && x <= r.hi) return true;
        }
        return false;
      },
      function every(a, r) {
        return !a.every(x => x < r.lo || x > r.hi);
      },
      function some(a, r) {
        return a.some(x => x >= r.lo && x <= r.hi);
      },
      function find(a, r) {
        return a.find(x => x >= r.lo && x <= r.hi) !== undefined;
      },
      function findIndex(a, r) {
        return a.findIndex(x => x >= r.lo && x <= r.hi) !== -1;
      },
  );
})();

const N = 1e7;
const a = [
  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
];
const r = {lo: 29, hi: 34};

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) result = fn(a, r);
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
