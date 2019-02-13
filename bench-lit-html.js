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

function tag(strings, ...values) {
  let a = 0;
  for (let i = 0; i < strings.length; ++i) a += strings[i].length;
  return a;
}

function driver(n) {
  let result = 0;
  for (let i = 0; i < n; ++i) {
    result += tag`${"Hello"} ${"cruel"} ${"slow"} ${"world"}!\n`;
    result += tag`${"Why"} ${"is"} ${"this"} ${"so"} ${"damn"} ${"slow"}?!\n`;
  }
  return result;
}

driver(10);
driver(100);
driver(1000);
driver(10000);

console.time('tag');
driver(1e6);
console.timeEnd('tag');
