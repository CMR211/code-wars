function generateHammingSequence(H0) {
    const H2 = H0.map(h => h*2)
    const H3 = H0.map(h => h*3)
    const H5 = H0.map(h => h*5)
    const res = new Set ([...H0, ...H2, ...H3, ...H5])
    return [...res].sort((a,b) => a-b)
}

function generateHammingNumbers(limit) {
    let numbers = [1]
    while(numbers.length < limit) {
        numbers = generateHammingSequence(numbers)
    }
    return numbers
}

function hamming(n) {
    return generateHammingNumbers(2*n)[n-1]
}