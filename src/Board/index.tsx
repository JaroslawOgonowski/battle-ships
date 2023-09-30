import React, { useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { colorSwitcher } from "./colorSwitcher";

type Cell = {
  value: number;
  state: number;
};

type BoardProps = {
  boardArray: Cell[][];
};

export const Board: React.FC<BoardProps> = ({ boardArray }) => {

  const randomBoard: { value: number; state: number }[][] = [];
  for (let i = 0; i < 10; i++) {
    randomBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      randomBoard[i][j] = { value: 0, state: 0 };
    }
  }

  function placeFiveAdjacent(board: { value: number; state: number }[][]) {
    while (true) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
  
      // Wybierz losowo poziomy lub pionowy kierunek
      const horizontal = Math.random() < 0.5;
  
      let canPlace = true;
  
      // Sprawdź, czy można umieścić pięć sąsiednich pól "1" w wybranym kierunku
      for (let i = 0; i < 5; i++) {
        const newRow = horizontal ? randomRow : randomRow + i;
        const newCol = horizontal ? randomCol + i : randomCol;
  
        if (
          newRow < 0 ||
          newRow >= 10 ||
          newCol < 0 ||
          newCol >= 10 ||
          board[newRow][newCol].value !== 0
        ) {
          canPlace = false;
          break;
        }
      }
  
      if (canPlace) {
        // Umieść pięć sąsiednich pól "1" w wybranym kierunku
        for (let i = 0; i < 5; i++) {
          const newRow = horizontal ? randomRow : randomRow + i;
          const newCol = horizontal ? randomCol + i : randomCol;
          board[newRow][newCol].value = 1;
        }
        break;
      }
    }
  }
  function placeFourSequential(board: { value: number; state: number }[][]) {
    while (true) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      const horizontal = Math.random() < 0.5;
  
      if (horizontal) {
        if (randomCol + 3 < 10) {
          let canPlace = true;
          for (let col = randomCol; col < randomCol + 4; col++) {
            if (board[randomRow][col].value === 1) {
              canPlace = false;
              break;
            }
            if (
              randomRow > 0 && board[randomRow - 1][col].value === 1 ||
              randomRow < 9 && board[randomRow + 1][col].value === 1 ||
              (col > 0 && board[randomRow][col - 1].value === 1) ||
              (col < 9 && board[randomRow][col + 1].value === 1) ||
              (randomRow > 0 && col > 0 && board[randomRow - 1][col - 1].value === 1) ||
              (randomRow > 0 && col < 9 && board[randomRow - 1][col + 1].value === 1) ||
              (randomRow < 9 && col > 0 && board[randomRow + 1][col - 1].value === 1) ||
              (randomRow < 9 && col < 9 && board[randomRow + 1][col + 1].value === 1)
            ) {
              canPlace = false;
              break;
            }
          }
  
          if (canPlace) {
            for (let col = randomCol; col < randomCol + 4; col++) {
              board[randomRow][col].value = 1;
            }
            break;
          }
        }
      } else {
        if (randomRow + 3 < 10) {
          let canPlace = true;
          for (let row = randomRow; row < randomRow + 4; row++) {
            if (board[row][randomCol].value === 1) {
              canPlace = false;
              break;
            }
            if (
              randomCol > 0 && board[row][randomCol - 1].value === 1 ||
              randomCol < 9 && board[row][randomCol + 1].value === 1 ||
              (row > 0 && board[row - 1][randomCol].value === 1) ||
              (row < 9 && board[row + 1][randomCol].value === 1) ||
              (row > 0 && randomCol > 0 && board[row - 1][randomCol - 1].value === 1) ||
              (row > 0 && randomCol < 9 && board[row - 1][randomCol + 1].value === 1) ||
              (row < 9 && randomCol > 0 && board[row + 1][randomCol - 1].value === 1) ||
              (row < 9 && randomCol < 9 && board[row + 1][randomCol + 1].value === 1)
            ) {
              canPlace = false;
              break;
            }
          }
  
          if (canPlace) {
            for (let row = randomRow; row < randomRow + 4; row++) {
              board[row][randomCol].value = 1;
            }
            break;
          }
        }
      }
    }
  }
  
  
  placeFiveAdjacent(randomBoard);
  placeFourSequential(randomBoard);
  placeFourSequential(randomBoard);
  placeFourSequential(randomBoard);
  placeFourSequential(randomBoard);
  const [board, setBoard] = useState(randomBoard);

  const columnHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rowHeaders = Array.from({ length: 11 }, (_, i) => i+1);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][columnIndex] = { ...updatedBoard[rowIndex][columnIndex], state: 2 }; // Ustaw odpowiedni stan, np. 2 oznacza pudło
    setBoard(updatedBoard);
  };


  return (
    <Table>
      <thead>
        <tr>
          <th></th> {/* Puste pole w lewym górnym rogu */}
          {columnHeaders.map((header, index) => (
            <TableHeader key={index}>{header}</TableHeader>
          ))}
        </tr>
      </thead>
      <TBody>
        <Circle />
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <TableHeader>{rowHeaders[rowIndex]}</TableHeader>{" "}
            {/* Dodanie cyfr w kolumnie po lewej stronie */}
            {row.map((cell, columnIndex) => (
              <StyledCell
                key={columnIndex}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
                color={colorSwitcher(cell.value)}
                data-coordinates={`(${columnHeaders[columnIndex]}, ${rowIndex+1})`} // Przekazanie współrzędnych
              >
                {cell.value}
              </StyledCell>
            ))}
          </tr>
        ))}
      </TBody>
    </Table>
  );
};
