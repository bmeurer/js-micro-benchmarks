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

const window = this;

function doTest() {
  writeResults('Small Buffer Little Endian', doIterations(100, true, 50000));
  writeResults('Small Buffer Big Endian', doIterations(100, false, 50000));
  writeResults('Medium Buffer Little Endian', doIterations(1000, true, 5000));
  writeResults('Medium Buffer Big Endian', doIterations(1000, false, 5000));
  writeResults('Big Buffer Little Endian', doIterations(10000, true, 500));
  writeResults('Big Buffer Big Endian', doIterations(10000, false, 500));
}

function writeResults(title, times) {
  console.log(`${title}: ${times.DV} ${times.JS}`);
}

function doIterations(size, littleEndian, iterations) {
  var buffer = makeBuffer(size, littleEndian);

  var startDV = performance.now();
  for (var i = 0; i < iterations; ++i) {
    doOneIterationDV(buffer, littleEndian);
  }
  var endDV = performance.now();

  var startJS = performance.now();
  for (var i = 0; i < iterations; ++i) {
    doOneIterationJS(buffer, littleEndian);
  }
  var endJS = performance.now();

  return {DV: endDV - startDV, JS: endJS - startJS};
}

function makeBuffer(size, littleEndian) {
  var buffer = new ArrayBuffer(size * 14);
  var view = new DataView(buffer);
  for (var i = 0; i < size; ++i) {
    view.setInt8(i * 14, i);
    view.setUint8(i * 14 + 1, i);
    view.setInt16(i * 14 + 2, i * i, littleEndian);
    view.setUint16(i * 14 + 4, i * i, littleEndian);
    view.setInt32(i * 14 + 6, i * i * i, littleEndian);
    view.setUint32(i * 14 + 10, i * i * i, littleEndian);
  }
  return buffer;
}

function doOneIterationDV(buffer, littleEndian) {
  window.counter = 0;
  var xor = 0;
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 14) {
    xor ^= view.getInt8(i);
    xor ^= view.getUint8(i + 1);
    xor ^= view.getInt16(i + 2, littleEndian);
    xor ^= view.getUint16(i + 4, littleEndian);
    xor ^= view.getInt32(i + 6, littleEndian);
    xor ^= view.getUint32(i + 10, littleEndian);
  }
  window.counter = xor;
}

function doOneIterationJS(buffer, littleEndian) {
  window.counter = 0;
  var xor = 0;
  if (littleEndian) {
    var reader = new LittleEndian(buffer);
    for (var i = 0; i < buffer.byteLength; i += 14) {
      xor ^= reader.getInt8(i);
      xor ^= reader.getUint8(i + 1);
      xor ^= reader.getInt16(i + 2);
      xor ^= reader.getUint16(i + 4);
      xor ^= reader.getInt32(i + 6);
      xor ^= reader.getUint32(i + 10);
    }
  } else {
    var reader = new BigEndian(buffer);
    for (var i = 0; i < buffer.byteLength; i += 14) {
      xor ^= reader.getInt8(i);
      xor ^= reader.getUint8(i + 1);
      xor ^= reader.getInt16(i + 2);
      xor ^= reader.getUint16(i + 4);
      xor ^= reader.getInt32(i + 6);
      xor ^= reader.getUint32(i + 10);
    }
  }
  window.counter = xor;
}

function BigEndian(buffer, opt_byteOffset) {
  this.uint8View_ = new Uint8Array(buffer, opt_byteOffset || 0);
  this.int8View_ = new Int8Array(buffer, opt_byteOffset || 0);
}
BigEndian.prototype.getInt8 = function(byteOffset) {
  return this.int8View_[byteOffset];
};
BigEndian.prototype.getUint8 = function(byteOffset) {
  return this.uint8View_[byteOffset];
};
BigEndian.prototype.getInt16 = function(byteOffset) {
  return this.uint8View_[byteOffset + 1] | (this.int8View_[byteOffset] << 8);
};
BigEndian.prototype.getUint16 = function(byteOffset) {
  return this.uint8View_[byteOffset + 1] | (this.uint8View_[byteOffset] << 8);
};
BigEndian.prototype.getInt32 = function(byteOffset) {
  return this.uint8View_[byteOffset + 3] |
      (this.uint8View_[byteOffset + 2] << 8) |
      (this.uint8View_[byteOffset + 1] << 16) |
      (this.int8View_[byteOffset] << 24);
};
BigEndian.prototype.getUint32 = function(byteOffset) {
  return this.uint8View_[byteOffset + 3] +
      (this.uint8View_[byteOffset + 2] << 8) +
      (this.uint8View_[byteOffset + 1] << 16) +
      (this.uint8View_[byteOffset] * (1 << 24));
};

function LittleEndian(buffer, opt_byteOffset) {
  this.uint8View_ = new Uint8Array(buffer, opt_byteOffset || 0);
  this.int8View_ = new Int8Array(buffer, opt_byteOffset || 0);
}
LittleEndian.prototype.getInt8 = function(byteOffset) {
  return this.int8View_[byteOffset];
};
LittleEndian.prototype.getUint8 = function(byteOffset) {
  return this.uint8View_[byteOffset];
};
LittleEndian.prototype.getInt16 = function(byteOffset) {
  return this.uint8View_[byteOffset] | (this.int8View_[byteOffset + 1] << 8);
};
LittleEndian.prototype.getUint16 = function(byteOffset) {
  return this.uint8View_[byteOffset] | (this.uint8View_[byteOffset + 1] << 8);
};
LittleEndian.prototype.getInt32 = function(byteOffset) {
  return this.uint8View_[byteOffset] |
      (this.uint8View_[byteOffset + 1] << 8) |
      (this.uint8View_[byteOffset + 2] << 16) |
      (this.int8View_[byteOffset + 3] << 24);
};
LittleEndian.prototype.getUint32 = function(byteOffset) {
  return this.uint8View_[byteOffset] +
      (this.uint8View_[byteOffset + 1] << 8) +
      (this.uint8View_[byteOffset + 2] << 16) +
      (this.uint8View_[byteOffset + 3] * (1 << 24));
};

doTest();
