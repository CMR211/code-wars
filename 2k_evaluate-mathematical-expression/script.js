function calc(expression) {
    return parseFloat(calculateExpr(expression).slice(1,-1))
}

function calculateExpr (expression) {
    console.log("Expression: ", expression)
    // removing "b" and "e" anchors already existing
    expression = expression.replace(/b|e/g, "")
    // removing spaces
    expression = expression.replace(/\s+/g, "")
    // replacing double minus sign to plus sign
    expression = expression.replace(/--/g, "+")
    expression = expression.replace(/(\)|\d)-/g, "$1+-")
    // adding anchors to indicate beginning and end of numbers
    expression = expression.replace(/(-?(?:\d+)(?:\.\d+)?)/g, "b$1e")
    // evaluating brackets
    while (expression.includes("(") && expression.includes(")")) {
        let parenthesis = expression.match(/-?\(.+\)/g)
        const substitutions = parenthesis.map((p) => {
            if (p[0] === "-") return calculateExpr(`b-1e*${calculateExpr(p.slice(2,-1))}`)
            else return calculateExpr(p.slice(1,-1))
        })
        for (let i = 0; i < parenthesis.length; i++) {
            expression = expression.replace(/-?\(.+\)/, substitutions[i])
        }
    }
    // evaluating first division or multiplication group
    while (expression.includes("/") || expression.includes("*")) {
        expression = calcPart(expression, "multOrDiv")
    }
    // evaluating first addition or subtraction group
    while (expression.includes("+") || expression.includes("-")) {
        if (expression.split("").filter((n) => n === "b").length < 2) break
        expression = calcPart(expression, "addOrSub")
    }
    return expression
}

/**
 *
 * @param {string} expression mathematical
 * @param {"multOrDiv"|"addOrSub"} symb indicates which math operator to choose
 * @returns {string}
 */
function calcPart(expression) {
    // capturing operands and operators
    const matches = expression.match(/b.+?e/g)
    const operands = [matches[0], matches[1]].map((n) => parseFloat(n.slice(1, -1)))
    const operator = expression.match(/e.b/g)[0].slice(1, -1)
    let result
    if (operator === "/") {
        if (operands[1] == 0) throw new Error("Cannot divide by 0")
        result = operands[0] / operands[1]
    }
    if (operator === "*") result = operands[0] * operands[1]
    if (operator === "+") result = operands[0] + operands[1]
    if (operator === "-") result = operands[0] - operands[1]
    return expression.replace(`${matches[0]}${operator}${matches[1]}`, `b${Math.round(result * 1e15) / 1e15}e`)
}

calculateExpr("2 /2+3 * 4.75- -6")

// b1476e/-b-3e+b-8e

module.exports = { calc }
