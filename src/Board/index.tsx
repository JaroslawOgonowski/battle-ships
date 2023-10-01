import React, { useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { stateColorSwitcher } from "./stateColorSwitcher";
import { valueColorSwitcher } from "./valueColorSwitcher";
import { placeShips } from "./placeShips";

type Cell = {
  value: number;
  state: number;
};

type BoardProps = {
  boardArray: Cell[][];
  oponentBoard?: boolean;
};

export const Board: React.FC<BoardProps> = ({ boardArray, oponentBoard }) => {
  const randomBoard: { value: number; state: number }[][] = [];
  for (let i = 0; i < 10; i++) {
    randomBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      randomBoard[i][j] = { value: 0, state: 0 };
    }
  }

  placeShips(randomBoard);
  const [board, setBoard] = useState(randomBoard);

  const columnHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rowHeaders = Array.from({ length: 11 }, (_, i) => i + 1);

  const handleCellClick = (
    rowIndex: number,
    columnIndex: number
  ) => {
    if (board[rowIndex][columnIndex].state !== 0) {
      return;
    }
    
    const updatedBoard = [...board];
    const clickedSquare = board[rowIndex][columnIndex];

    if (clickedSquare.value > 0) {
      updatedBoard[rowIndex][columnIndex] = {
        ...updatedBoard[rowIndex][columnIndex],
        state: 1,
      };
      setBoard(updatedBoard);
      
      if (clickedSquare.value === 1) {
        updatedBoard[rowIndex][columnIndex] = {
          ...updatedBoard[rowIndex][columnIndex],
          state: 3,
        };
        setBoard(updatedBoard);
      } else if (
        clickedSquare.value === 2 &&
        (rowIndex > 0 && updatedBoard[rowIndex - 1][columnIndex].state === 1 ||
         rowIndex < updatedBoard.length - 1 && updatedBoard[rowIndex + 1][columnIndex].state === 1 ||
         columnIndex > 0 && updatedBoard[rowIndex][columnIndex - 1].state === 1 ||
         columnIndex < updatedBoard[rowIndex].length - 1 && updatedBoard[rowIndex][columnIndex + 1].state === 1)
      ) {
        updatedBoard[rowIndex][columnIndex] = {
          ...updatedBoard[rowIndex][columnIndex],
          state: 3,
        };
        setBoard(updatedBoard);
      }
    } else {
      updatedBoard[rowIndex][columnIndex] = {
        ...updatedBoard[rowIndex][columnIndex],
        state: 2,
      };
      setBoard(updatedBoard);
    }
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
                color={
                  oponentBoard
                    ? stateColorSwitcher(cell.state)
                    : valueColorSwitcher(cell.value)
                }
                data-coordinates={`(${columnHeaders[columnIndex]}, ${
                  rowIndex + 1
                })`} // Przekazanie współrzędnych
              ></StyledCell>
            ))}
          </tr>
        ))}
      </TBody>
    </Table>
  );
};
