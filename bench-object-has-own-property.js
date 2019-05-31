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

(function() {
  TESTS.push(
      function objectHasOwnPropertyString(o, s, i, k) {
        return o.hasOwnProperty(s);
      },
      function objectHasOwnPropertyConsString(o, s, i, k) {
        return o.hasOwnProperty(s + "01234567890123456");
      },
      function objectHasOwnPropertyIndex(o, s, i, k) {
        return o.hasOwnProperty(i);
      },
      function directHasOwnPropertyGeneric(o, s, i, k) {
        return o.hasOwnProperty(k);
      }
  );
})();

const L = 100;
const N = 1e5;
const objs = [{x: 1}];
for (let i = 1; i < L; ++i) {
  if (i % 8 == 0) {
    const a = [1, 2, 3];
    a.x = 1;
    objs.push(a);
  } else if (i % 4 == 0) {
    objs.push(Object.create({x: 1}));
  } else if (i % 2 == 0) {
    objs.push({x01234567890123456: 1});
  } else {
    objs.push({a:1, b:2, c:3, d:4});
  }
}

class Key {
  [Symbol.toPrimitive]() { return "x"; }
}
const key = new Key();
function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) {
    for (var j = 0; j < objs.length; ++j) {
      result = fn(objs[j], "x", 0, key);
    }
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
