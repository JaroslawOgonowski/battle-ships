export const hitCheck = (
  selectedRow: number,
  selectedColumn: number,
  updatedBoard: { value: number; state: string }[][],
  clickedSquare: { value: number; state: string },
  setBoard: React.Dispatch<
    React.SetStateAction<{ value: number; state: string }[][]>
  >
) => {
  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];

  if (clickedSquare.value > 0) {
    updatedBoard[selectedRow][selectedColumn] = {
      ...clickedSquare,
      state: "Hit",
    };

    const targetValue = clickedSquare.value;
    let allSameValueCellsHaveState1 = true;

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = updatedBoard[row][col];

        if (cell.value === targetValue && cell.state !== "Hit") {
          allSameValueCellsHaveState1 = false;
          break;
        }
      }

      if (!allSameValueCellsHaveState1) {
        break;
      }
    }

    if (allSameValueCellsHaveState1) {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const cell = updatedBoard[row][col];

          if (cell.value === targetValue) {
            cell.state = "Direct Hit";
          }
        }
      }
    }
    setBoard(updatedBoard);
  } else {
    updatedBoard[selectedRow][selectedColumn] = {
      ...clickedSquare,
      state: "Missed",
    };

    setBoard(updatedBoard);
  }

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = updatedBoard[row][col];

      if (cell.state === "Direct Hit") {
        for (const [dx, dy] of directions) {
          const newRow = row + dy;
          const newColumn = col + dx;

          if (
            newRow >= 0 &&
            newRow < 10 &&
            newColumn >= 0 &&
            newColumn < 10 &&
            updatedBoard[newRow][newColumn].value === 0
          ) {
            updatedBoard[newRow][newColumn].state = "Missed";
          }
        }
      }
    }
  }
};
