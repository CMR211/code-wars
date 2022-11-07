function calc(expression) {
    return parseFloat(calculateExpr(expression).slice(1, -1))
}

// "-2 / -(2 + 3) * 4.33 - -6"
function calculateExpr(exp) {
    // 0. remove existing number anchors
    exp = exp.replace(/b|e/g, "")
    // 1. trim spaces - "-2/-(2+3)*4.33--6"
    exp = exp.replace(/\s/g, "")
    // 2. numbers anchors - "b-2e/-(b2e+b3e)*b4.33e-b-6e"
    exp = exp.replace(/(-?\d+(?:\.\d+)?)/g, "b$1e")
    // 3. evaluating brackets
    const brackets = exp.match(/\(.*\)/g)
    if (brackets) {
        const solutions = brackets.map((bracket) => calculateExpr(bracket.slice(1, -1)))
        for (let i = 0; i < brackets.length; i++) exp = exp.replace(brackets[i], solutions[i])
    }
    while (exp.contains("*") || exp.contains("/")) exp = calculateMultAndDivide(exp)
    while (exp.contains("+") || exp.contains("-")) exp = calculateAddAndSubt(exp)
    return exp
}

function calculateMultAndDivide(exp) {
    
    
}

calculateExpr("-2 / -(2 + 3) * 4.33 - -6")

module.exports = { calc }
