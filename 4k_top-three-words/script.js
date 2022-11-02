function topThreeWords(text) {
    const matchedWords = text.toLowerCase().match(/([a-z]|')+/gi)
    const wordCount = {}
    if (matchedWords === null) return []
    matchedWords
        .filter((word) => word !== "'")
        .forEach((word) => {
            if (!wordCount.hasOwnProperty(word)) {
                wordCount[word] = 1
                return
            }
            if (wordCount.hasOwnProperty(word)) {
                wordCount[word] = wordCount[word] + 1
                return
            }
        })
    const wordCountArray = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .map((x) => x[0])
        .slice(0, 3)
    return wordCountArray
}
