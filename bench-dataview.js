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
const K = 1024;
const arrayBuffer = new ArrayBuffer(K * 8);

(function() {
  TESTS.push(
      function testDataViewGetUint8(arrayBuffer) {
        const dataView = new DataView(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K; i += 1) {
          s = dataView.getUint8(i, true);
        }
        return s;
      },
      function testUint8Array(arrayBuffer) {
        const uint8Array = new Uint8Array(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K; i += 1) {
          s = uint8Array[i];
        }
        return s;
      },
      function testDataViewGetUint16(arrayBuffer) {
        const dataView = new DataView(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K * 2; i += 2) {
          s = dataView.getUint16(i, true);
        }
        return s;
      },
      function testUint16Array(arrayBuffer) {
        const typedArray = new Uint16Array(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K; i += 1) {
          s = typedArray[i];
        }
        return s;
      },
      function testDataViewGetInt32(arrayBuffer) {
        const dataView = new DataView(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K * 4; i += 4) {
          s = dataView.getInt32(i, true);
        }
        return s;
      },
      function testInt32Array(arrayBuffer) {
        const typedArray = new Int32Array(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K; i += 1) {
          s = typedArray[i];
        }
        return s;
      },
      function testDataViewGetFloat64(arrayBuffer) {
        const dataView = new DataView(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K * 8; i += 8) {
          s = dataView.getFloat64(i, true);
        }
        return s;
      },
      function testFloat64Array(arrayBuffer) {
        const typedArray = new Float64Array(arrayBuffer);
        let s = 0;
        for (let i = 0; i < K; i += 1) {
          s = typedArray[i];
        }
        return s;
      },
  );
})();

const N = 1e6;

function test(fn) {
  var result;
  for (var i = 0; i < N; ++i) result = fn(arrayBuffer);
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


