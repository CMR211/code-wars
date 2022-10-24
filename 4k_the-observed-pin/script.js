function getPINs(observed) {
    const neighbors = {
        1: ["2", "4"],
        2: ["1", "3", "5"],
        3: ["2", "6"],
        4: ["1", "5", "7"],
        5: ["2", "4", "6", "8"],
        6: ["3", "5", "9"],
        7: ["4", "8"],
        8: ["5", "7", "9", "0"],
        9: ["6", "8"],
        0: ["8"],
    }
    const numbers = observed.split("")
    const combinations = numbers.map((number) => [ ...neighbors[number], number].sort())

    let result = []
    for (let i = 0; i < combinations.length; i++) result = combine(result, combinations[i])
    return result
}

function combine(start, next) {
    const res = []
    if (start.length === 0) return [...next]
    for (let i of start) {
        for (let j of next) {
            res.push(i + j)
        }
    }
    return res
}

module.exports = { getPINs, combine }
