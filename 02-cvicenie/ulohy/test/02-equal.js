const assert = require("assert");
describe("Exploratory tests - 4 equality algs", function() {
  it("== (Abstract)", function() {
    // doplnte rue false miesto null
    assert.strictEqual(null == undefined, true);
    assert.strictEqual(0 == -0, true);
    assert.strictEqual(0 == "0", true);
    assert.strictEqual(NaN == NaN, false);
    assert.strictEqual({} == {}, false);
  });
  it("=== (Strict)", function() {
    assert.strictEqual(null === undefined, false)
    assert.strictEqual(0 === -0, true);
    assert.strictEqual(0 === "0", false);
    assert.strictEqual(NaN === NaN, false);
    assert.strictEqual({} === {}, false);
  });
  it("SameValueZero", function() {
    assert.strictEqual([0].includes("0"), false);
    assert.strictEqual([0].includes("-0"), false);
    assert.strictEqual([0].includes(NaN), false);
    assert.strictEqual([{}].includes({}), false);
  });
  it("SameValue", function() {
    assert.strictEqual(Object.is(0, -0), false);
    assert.strictEqual(Object.is(0, "0"), false);
    assert.strictEqual(Object.is(NaN, NaN), true);
    assert.strictEqual(Object.is({ a: 1 }, { a: 1 }), false);
  });
  it("implement function sameValueZeroEqual", function() {
    function sameValueZeroEqual(a, b) {
    	return (isNaN(a) && isNaN(b))? true : a === b
    }
    assert.equal(sameValueZeroEqual(0, -0), true);
    assert.equal(sameValueZeroEqual(1, "1"), false);
    assert.equal(sameValueZeroEqual(NaN, NaN), true);
    assert.equal(sameValueZeroEqual(100, 100), true);
  });

});