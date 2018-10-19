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

const N = 1e7;
const OBJS = [
  {},
  {x:1},
  {x:1, y:1},
  {x:1,y:1,z:1},
  {x:1,y:1,z:1,w:1},
  {__proto__: {x:1}},
  {__proto__: {x:1}, y:1},
  {__proto__: {x:1}, y:1, z:1},
  {__proto__: {x:1}, y:1, z:1, w:1},
];

function test(objs, n) {
  let result = undefined;
  for (let i = 0; i < n; ++i) {
    const len = objs.length;
    for (let j = 0; j < len; ++j) {
      const o = objs[j];
      result = o.x;
    }
  }
  return result;
}

// Warmup
test(OBJS, N);

// Measure
const start = Date.now();
test(OBJS, N);
const time = Date.now() - start;
const score = (1 / time) * N * OBJS.length;
print("score: " + score.toFixed(2) + " runs/ms.");
