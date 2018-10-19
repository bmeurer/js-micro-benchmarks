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

let N = 100000; // number of objects
let M = 20;     // number of properties

let properties = [];
for (let i = 0; i < M; i++) {
  properties.push(`property${i}`);
}

let descriptorA = {
  configurable: false,
  enumerable: true
};
let descriptorB = {
  enumerable: false
};

function objectDef(obj, desc) {
  return function(prop) {
    try {
      Object.defineProperty(obj, prop, desc);
      return true;
    } catch (e) {
      return false;
    }
  }
}

function reflectDef(obj, desc) {
  return function(prop) {
    return Reflect.defineProperty(obj, prop, desc);
  }
}

function run(fn) {
  let start = performance.now();
  let ok = 0;
  for (let i = 0; i < N; i++) {
    let obj = {};
    ok += properties.filter(fn(obj, descriptorA)).length;
    //ok += properties.filter(fn(obj, descriptorB)).length;
  }
  let end = performance.now();
  console.log(`${fn.name}: ${end - start} ms.`);
}

run(reflectDef);
run(objectDef);
