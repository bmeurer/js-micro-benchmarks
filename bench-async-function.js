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

const N = 1e8;

async function delay(i) {
  return 1;
}

function test(n) {
  // Invoke delay n times and take the time to do that plus the time to
  // empty the microtask queue.
  const startTime = Date.now();
  for (let i = 0; i < n; ++i) delay(i);
  return Promise.resolve(startTime).then(startTime => {
    return Date.now() - startTime;
  });
}

(async function() {
  // Warmup.
  for (let i = 1; i < 100; ++i) await test(i);

  // Test.
  const time = await test(N);

  console.log(`time: ${time} ms.`);
})();
