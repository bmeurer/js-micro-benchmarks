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

var packed = [];
for (var i = 0; i < 128; ++i) packed[i] = 0.1;
var holey = new Array(128).fill(0.1);

const TESTS = [];

(function() {
  TESTS.push(
      function copyHoley(holey, packed) {
        for (var i = 0; i < holey.length; ++i) {
          holey[i] = holey[i];
        }
      },
      function copyPacked(holey, packed) {
        for (var i = 0; i < packed.length; ++i) {
          packed[i] = packed[i];
        }
      }
  );
})();

const N = 1e6;

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) result = fn(holey, packed);
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
