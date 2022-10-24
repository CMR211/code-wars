function isValidIP(str) {
    const arr = str.split(".")
    const res = arr.map((part) => isValidPart(part))
    if (res.length !== 4) return false
    return res.reduce((p, c) => p && c, true)
}

function isValidPart(part) {
    // testing for empty input
    if (part === "") return false
    // testing for non-digits
    if (isNaN(parseInt(part))) return false
    if (part.search(/\D/) > -1) return false
    // testing if number is between 0 and 255
    if (parseInt(part) < 0 || parseInt(part) > 255) return false
    // testing for leading 0
    if (parseInt(part) !== 0 && part[0] === "0") return false
    // testing for only zeros
    if (parseInt(part) === 0 && part.length > 1) return false
    return true
}

isValidIP("0.0.0.0")

module.exports = { isValidIP }
