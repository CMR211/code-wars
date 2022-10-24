const { assert } = require("chai")
const { expand } = require("./script.js")

describe("expand()", function () {
    it("Should correctly expand binomials where a=1 and b is positive", function () {
        assert.strictEqual(expand("(x+1)^0"), "1")
        assert.strictEqual(expand("(x+1)^1"), "x+1")
        assert.strictEqual(expand("(x+1)^2"), "x^2+2x+1")
    })
    it("Should correctly expand binomials where a=1 and b is negative", function () {
        assert.strictEqual(expand("(x-1)^0"), "1")
        assert.strictEqual(expand("(x-1)^1"), "x-1")
        assert.strictEqual(expand("(x-1)^2"), "x^2-2x+1")
    })
    it("Should correctly expand binomials where a is positive.", function () {
        assert.strictEqual(expand("(5m+3)^4"), "625m^4+1500m^3+1350m^2+540m+81")
        assert.strictEqual(expand("(2x-3)^3"), "8x^3-36x^2+54x-27")
        assert.strictEqual(expand("(7x-7)^0"), "1")
    })
    it("Should correctly expand binomials where a is negative.", function () {
        assert.strictEqual(expand("(-5m+3)^4"), "625m^4-1500m^3+1350m^2-540m+81")
        assert.strictEqual(expand("(-2k-3)^3"), "-8k^3-36k^2-54k-27")
        assert.strictEqual(expand("(-7x-7)^0"), "1")
    })
    it("Additional tests", function () {
        assert.strictEqual(expand("(-11y-18)^4"), "14641y^4+95832y^3+235224y^2+256608y+104976")
        assert.strictEqual(expand("(-5x+0)^3"), "-125x^3")
    })
})
