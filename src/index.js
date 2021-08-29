module.exports = function solveSudoku(matrix) {
    let newMatrix = [];

    for (let i in matrix) {
        newMatrix[i] = [...matrix[i]]
    }

    newMatrix = endSudoku(newMatrix);

    return newMatrix;
}

function findZero(matrix) {
    for (let i = 0; i < matrix.length; i++){
        for (let y = 0; y < matrix.length; y++){
            if (matrix[i][y] === 0) return [i, y];
        }
    }

    return false;
}

function canEnterNumberInMatrix(number, zeroCoords, matrix) {
    const [row, column] = zeroCoords;

    //check rows
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][column] === number && i !== row) {
            return false;
        }
    }

    //check column
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[row][i] === number && i !== column) {
            return false;
        }
    }

    //check section
    const rowStart = Math.floor(row / 3) * 3;
    const columnStart = Math.floor(column / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let y = columnStart; y < columnStart + 3; y++) {
            if (matrix[i][y] === number && i !== row && y !== column) {
                return false;
            }
        }
    }

    return true;
}

function endSudoku (newMatrix) {
    let zeroCoords = findZero(newMatrix);

    if (!zeroCoords) {
        return newMatrix;
    }

    for (let i = 1; i < newMatrix.length + 1; i++) {
        let number = i;
        let numberValid = canEnterNumberInMatrix(number, zeroCoords, newMatrix);

        if (numberValid) {
            const [row, column] = zeroCoords;
            newMatrix[row][column] = number;

            if (endSudoku(newMatrix)) {
                return newMatrix;
            }

            newMatrix[row][column] = 0;
        }
    }

    return false;
}