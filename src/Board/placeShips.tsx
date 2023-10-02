function placeSequential(board: { value: number; state: number }[][], value: number, numFields: number) {
  while (true) {
    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);
    const horizontal = Math.random() < 0.5;

    if (horizontal) {
      if (randomCol + numFields <= 10) {
        let canPlace = true;
        for (let col = randomCol; col < randomCol + numFields; col++) {
          if (board[randomRow][col].value !== 0) { // Zmieniamy warunek na różny od zera
            canPlace = false;
            break;
          }
          if (
            randomRow > 0 && board[randomRow - 1][col].value !== 0 || // Zmieniamy warunek na różny od zera
            randomRow < 9 && board[randomRow + 1][col].value !== 0 || // Zmieniamy warunek na różny od zera
            (col > 0 && board[randomRow][col - 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (col < 9 && board[randomRow][col + 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (randomRow > 0 && col > 0 && board[randomRow - 1][col - 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (randomRow > 0 && col < 9 && board[randomRow - 1][col + 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (randomRow < 9 && col > 0 && board[randomRow + 1][col - 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (randomRow < 9 && col < 9 && board[randomRow + 1][col + 1].value !== 0) // Zmieniamy warunek na różny od zera
          ) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let col = randomCol; col < randomCol + numFields; col++) {
            board[randomRow][col].value = value;
          }
          break;
        }
      }
    } else {
      if (randomRow + numFields <= 10) {
        let canPlace = true;
        for (let row = randomRow; row < randomRow + numFields; row++) {
          if (board[row][randomCol].value !== 0) { // Zmieniamy warunek na różny od zera
            canPlace = false;
            break;
          }
          if (
            randomCol > 0 && board[row][randomCol - 1].value !== 0 || // Zmieniamy warunek na różny od zera
            randomCol < 9 && board[row][randomCol + 1].value !== 0 || // Zmieniamy warunek na różny od zera
            (row > 0 && board[row - 1][randomCol].value !== 0) || // Zmieniamy warunek na różny od zera
            (row < 9 && board[row + 1][randomCol].value !== 0) || // Zmieniamy warunek na różny od zera
            (row > 0 && randomCol > 0 && board[row - 1][randomCol - 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (row > 0 && randomCol < 9 && board[row - 1][randomCol + 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (row < 9 && randomCol > 0 && board[row + 1][randomCol - 1].value !== 0) || // Zmieniamy warunek na różny od zera
            (row < 9 && randomCol < 9 && board[row + 1][randomCol + 1].value !== 0) // Zmieniamy warunek na różny od zera
          ) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let row = randomRow; row < randomRow + numFields; row++) {
            board[row][randomCol].value = value;
          }
          break;
        }
      }
    }
  }
}
  
export const placeShips = (board: { value: number; state: number }[][]) => {
  placeSequential(board, 1, 5);
  placeSequential(board, 2, 4);
  placeSequential(board, 3, 2);
  placeSequential(board, 4, 2);
  placeSequential(board, 5, 3);
  placeSequential(board, 6, 3);
  placeSequential(board, 7, 1);
  placeSequential(board, 8, 1);
  placeSequential(board, 9, 1);
}