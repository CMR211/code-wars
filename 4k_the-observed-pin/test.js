const { assert, config } = require("chai")

const { getPINs, combine } = require("./script.js")

config.truncateThreshold = 0

describe("# Combine() function", () => {
    const a = ["1", "4", "5"]
    const b = ["2", "3", "6"]
    const c = ["1","2"]
    const d = ["3","4"]

    describe(`## Test for args [${c}] and [${d}]`, () => {
        it(`Should return ["13", "14", "23", "24"]`, 
            () => assert.sameMembers(
                combine(c,d), 
                ["13", "14", "23", "24"], 
                `Function returns ${combine(c,d)} instead.`
            )
        )
    })

    describe(`## Test for args [${a}] and [${b}]`, () => {
        it(`Should return an array`, () => assert.typeOf(combine(a,b),"array"))
        it(`Should have length of 9 elements`, () => assert.lengthOf(combine(a, b), 9))
    })
})

describe("# The observed PIN", function () {
    let expectations = {
        8: ["5", "7", "8", "9", "0"],
        11: ["11", "22", "44", "12", "21", "14", "41", "24", "42"],
        369: [
            "339",
            "366",
            "399",
            "658",
            "636",
            "258",
            "268",
            "669",
            "668",
            "266",
            "369",
            "398",
            "256",
            "296",
            "259",
            "368",
            "638",
            "396",
            "238",
            "356",
            "659",
            "639",
            "666",
            "359",
            "336",
            "299",
            "338",
            "696",
            "269",
            "358",
            "656",
            "698",
            "699",
            "298",
            "236",
            "239",
        ],
    }

    for (let pin in expectations) {
        it(`Testing PIN = '${pin}'`, () => {
            assert.sameMembers(getPINs(pin), expectations[pin])
        })
    }
})
