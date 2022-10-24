function expand(expr) {
    // getting all the coefficients
    const c = parseInt(expr.match(/\^(\d+)/gm)[0].slice(1))
    const a_txt = expr.match(/(-?\d*)[a-z]/gm)[0].slice(0, -1)
    const a = a_txt === "" ? 1 : a_txt === "-" ? -1 : parseInt(a_txt)
    const b = parseInt(expr.match(/(-?\d+)\)/gm)[0])
    const x = expr.match(/[a-z]/)[0]
    // special case when power is 0
    if (c === 0) return "1"
    // generating expression parts using Pascal's triangle values for Kn
    // K0*a^c*x^c + K1*a^(c-1)*b^(1)*x^(c-1) + K2*a^(c-2)*b^(2)*x^(c-2) + ... + Kc*b^c
    const elements = []
    for (let n = 0; n <= c; n++) {
        let element
        switch (n) {
            case 0:
                element = `${a ** c}${x}^${c}`
                break
            case c:
                element = `${b ** c}`
                break
            default:
                element = `${comb(c, n) * a ** (c - n) * b ** n}${x}^${c - n}`
                break
        }
        elements.push(element)
    }
    // cleaning all the parts
    const res = cleanParts(elements)
    return res
    // return {expr, res}
}

function cleanParts(array) {
    return array
    .join(" ")
    // removing unnecessary "1" in front of part
    .replace(/-1([a-z])/g, "-$1")
    .replace(/^1([a-z])/g, "$1")
    // removing unnecessary "^1"
    .replace(/\^1\s/g, " ")
    // joining negative parts 
    .replace(/\s-/g, "-")
    // joining positive parts
    .replace(/\s/g, "+")
    // removing parts with coefficient = 0
    .replace(/(\+|-)0.*0/g, "")
}

function comb(n, k) {
    // nCr math function
    return factorial(n) / (factorial(k) * factorial(n - k))
}

function factorial(n) {
    // needed for nCr function
    let res = 1
    for (let i = 1; i <= n; i++) {
        res = res * i
    }
    return res
}

console.log(expand("(x+1)^0"))
console.log(expand("(x+1)^1"))
console.log(expand("(x+1)^2"))
console.log(expand("(x-1)^1"))
console.log(expand("(x-1)^2"))
console.log(expand("(-x-1)^3"))
console.log(expand("(5m+3)^4"))
console.log(expand("(2x-3)^3"))
console.log(expand("(7x-7)^0"))
console.log(expand("(-5m+3)^4"))
console.log(expand("(-2k-3)^3"))
console.log(expand("(-7x-17)^0"))
console.log(expand("(-5x+0)^3"))


module.exports = { expand }
