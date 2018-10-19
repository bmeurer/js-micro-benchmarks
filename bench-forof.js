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

const N = 1e4;

function forOf(a) {
  for (const x of a) {}
}

forOf([]);
forOf(new Map());
forOf(new Set());

function test(f, a) {
  let result;
  for (let i = 0; i < N; ++i) result = f(a);
  return result;
}

const K = 1024;
const a = [];
for (let i = 0; i < K; ++i) a[i] = i;
const b = [];
b[16 * 1024] = 1;
for (let i = 0; i < K; ++i) b[i] = i;
b.length = K;

forOf(a);
forOf(b);

test(forOf, a);
for (let i = 0; i < 10; ++i) test(x => x, a);

console.time('fast');
test(forOf, a);
console.timeEnd('fast');

console.time('dict');
test(forOf, b);
console.timeEnd('dict');


