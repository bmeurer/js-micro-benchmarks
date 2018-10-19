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

let inputs = new Array(16);
for (let i = 0; i < inputs.length; ++i) inputs[i] = i;
inputs = Object.freeze(inputs);

const TESTS = [];

(function() {
  TESTS.push(
      function dictionary(a) {
        let s = 0;
        for (let i = 0; i < a.length; ++i) s += a[i];
        return s;
      }
  );
})();

const N = 1e7;

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) result = fn(inputs);
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
