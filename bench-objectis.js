if (typeof console === 'undefined') console = {log:print};

function testNumberIsMinusZero(o) {
  let result = 0;
  o = +o;
  for (let i = 0; i < N; ++i) {
    if (Object.is(o, -0)) result++;
  }
  return result;
}

function testObjectIsMinusZero(o) {
  let result = 0;
  for (let i = 0; i < N; ++i) {
    if (Object.is(o, -0)) result++;
  }
  return result;
}

function testObjectIsNaN(o) {
  let result = 0;
  for (let i = 0; i < N; ++i) {
    if (Object.is(o, NaN)) result++;
  }
  return result;
}

function testObjectIsSame(o) {
  let result = 0;
  for (let i = 0; i < N; ++i) {
    if (Object.is(o, o)) result++;
  }
  return result;
}

function testStrictEqualSame(o) {
  let result = 0;
  for (let i = 0; i < N; ++i) {
    if (o === o) result++;
  }
  return result;
}

const N = 1e7;
const OBJS = [-0, 0, undefined, NaN, null, '', {}, []];
const TESTS = [
    testNumberIsMinusZero,
    testObjectIsMinusZero,
    testObjectIsNaN,
    testObjectIsSame,
    testStrictEqualSame
];

function test(fn) {
  var result;
  for (var o of OBJS) result = fn(o);
  return result;
}

for (var j = 0; j < TESTS.length; ++j) {
  test(TESTS[j]);
}

for (var j = 0; j < TESTS.length; ++j) {
  var startTime = Date.now();
  test(TESTS[j]);
  console.log(TESTS[j].name + ':', (Date.now() - startTime), 'ms.');
}
