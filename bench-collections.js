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

const size = 100;
const arr = (new Array(size)).join(' ').split(' ')
	.map((a, i) => `${i}`);

const picked = arr.filter(() => Math.random() > 0.5);

const set = new Set(picked);
const map = new Map([...picked.map(v => [v, v])]);

const rand = () => String(Math.floor(Math.random() * size));

const N = 1e6;

function testMap() {
  var val = rand();
  return map.has(val);
}
function testSet() {
  var val = rand();
  return set.has(val);
}

function test(f) {
  let result;
  for (var i = 0; i < N; ++i) result = f();
  return result;
}

for (var i = 0; i < 100; ++i) test(() => {});
for (var i = 0; i < 1e5; ++i) {
  testSet();
  testMap();
}

console.time('set');
test(testSet);
console.timeEnd('set');

console.time('map');
test(testMap);
console.timeEnd('map');
