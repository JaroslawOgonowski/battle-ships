import React, { useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { stateColorSwitcher } from "./stateColorSwitcher";
import { valueColorSwitcher } from "./valueColorSwitcher";

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
    
  const placeShips = (board: { value: number; state: number }[][]) => {
    placeSequential(board, 5, 5);
    placeSequential(board, 4, 4);
    placeSequential(board, 2, 2);
    placeSequential(board, 2, 2);
    placeSequential(board, 3, 3);
    placeSequential(board, 3, 3);
    placeSequential(board, 1, 1);
    placeSequential(board, 1, 1);
    placeSequential(board, 1, 1);
  }
  
  placeShips(randomBoard);
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
                color={valueColorSwitcher(cell.value)}
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
