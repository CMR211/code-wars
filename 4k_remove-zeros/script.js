function removeZeros(array) {
    const len = array.length
    for (let i = 0; i < len; i++) {
        const item = array[i]
        if (item === "zero_number") {
            array[i] = 0
            continue
        }
        if (item === "zero_string") {
            array[i] = "0"
            continue
        }
        if (item === 0 || item === "0") {
            for (let j = 0; j < len - i; j++) {
                array[i + j] = array[i + j + 1]
            }
            let temp
            if (item === 0) temp = "zero_number"
            if (item === "0") temp = "zero_string"
            array[len - 1] = temp
            i--
        }
    }
    return array
}

console.log(removeZeros([7, 2, 3, "0", 4, 6, 0, 0, 13, 0, 78, "0", 0, 19, 14]))

// [7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]
// [7, 2, 3, 4, 6, 13, 78, 19, 14, 0, 0, 0, 0, 0, 0]
