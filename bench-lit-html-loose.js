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

"use strict";


var _templateObject = _taggedTemplateLiteralLoose(
        ["", " ", " ", " ", "!\n"],
            ["", " ", " ", " ", "!\\n"]
              ),
      _templateObject2 = _taggedTemplateLiteralLoose(
              ["", " ", " ", " ", " ", " ", "?!\n"],
                  ["", " ", " ", " ", " ", " ", "?!\\n"]
                    );

      function _taggedTemplateLiteralLoose(strings, raw) {
        strings.raw = raw;
        return strings;
      }

function tag(strings) {
  var a = 0;
  for (var i = 0; i < strings.length; ++i) {
      a += strings[i].length;
    }
  return a;
}

function driver(n) {
  var result = 0;
  for (var i = 0; i < n; ++i) {
      result += tag(_templateObject, "Hello", "cruel", "slow", "world");
      result += tag(_templateObject2, "Why", "is", "this", "so", "damn", "slow");
    }
  return result;
}

driver(10);
driver(100);
driver(1000);
driver(10000);

console.time("Time");
driver(1e6);
console.timeEnd("Time");
