function sortNumber(testArray) {
    let log2result = getBaseLog(2, testArray.length);
    if (Number.isInteger(log2result)) {
        return testArray;
    } else { // number is not a power of two
        // gonna have to sort those powers of two aren't we
        let metaArray = [];
        while (testArray.length != 1) {
            let closestTwo = closestPowerOfTwo(testArray.length);
            let splicedArray = testArray.splice(0, closestTwo);
            metaArray.push(splicedArray);
        }
        metaArray.push(testArray);
        return metaArray;
    }

}

function closestPowerOfTwo(number) {
    return Math.pow(2,Math.floor(Math.log(number)/Math.log(2)));
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

var oddLeaves2 = ['A', 'B', 'C', 'D', 'E']; // 5
var oddLeaves3 = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // 7
var oddLeaves4 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // 9

// console.log(sortNumber(oddLeaves2));
// console.log(sortNumber(oddLeaves3));
console.log(sortNumber(oddLeaves4));
