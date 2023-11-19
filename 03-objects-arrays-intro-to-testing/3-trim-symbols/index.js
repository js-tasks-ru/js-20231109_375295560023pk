/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (size === 0) return ''

    const stringArr = string.split('')
    let newStr = ''
    let frequency = 0

    for(let i = 0; i < string.length; i++) {
        if (newStr[newStr.length - 1] !== stringArr[i]) frequency = 0
        if (frequency === size) continue

        newStr += stringArr[i]
        frequency++

    }

    return newStr
}
