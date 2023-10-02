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

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (board[rowIndex][columnIndex].state !== 0) {
      return;
    }

    const updatedBoard = [...board];
    let clickedSquare = updatedBoard[rowIndex][columnIndex];
    if (clickedSquare.value > 0) {
      updatedBoard[rowIndex][columnIndex] = {
        ...clickedSquare,
        state: 1,
      };
      setBoard(updatedBoard);

      const checkAndUpdateCells = () => {
        let rowAllMatch = true;
        for (let col = 0; col < updatedBoard[rowIndex].length; col++) {
          if (
            updatedBoard[rowIndex][col].value === clickedSquare.value &&
            updatedBoard[rowIndex][col].state !== 1
          ) {
            rowAllMatch = false;
            break;
          }
          console.log("rowAllMatch:", rowAllMatch);
        }

        let columnAllMatch = true;
        for (let row = 0; row < updatedBoard.length; row++) {
          if (
            updatedBoard[row][columnIndex].value === clickedSquare.value &&
            updatedBoard[row][columnIndex].state !== 1
          ) {
            columnAllMatch = false;
            break;
          }
        }

        if (rowAllMatch && columnAllMatch) {
          for (let col = 0; col < updatedBoard[rowIndex].length; col++) {
            if (updatedBoard[rowIndex][col].value === clickedSquare.value) {
              if (updatedBoard[rowIndex + 1][col].state != 3)
                updatedBoard[rowIndex + 1][col].state = 2;
              if (updatedBoard[rowIndex + 1][col].state != 3)
                updatedBoard[rowIndex + 1][col].state = 2;
              if (updatedBoard[rowIndex - 1][col].state != 3)
                updatedBoard[rowIndex - 1][col].state = 2;
              if (updatedBoard[rowIndex][col + 1].state != 3)
                updatedBoard[rowIndex][col + 1].state = 2;
              if (updatedBoard[rowIndex][col - 1].state != 3)
                updatedBoard[rowIndex][col - 1].state = 2;
              if (updatedBoard[rowIndex + 1][col + 1].state != 3)
                updatedBoard[rowIndex + 1][col + 1].state = 2;
              if (updatedBoard[rowIndex - 1][col - 1].state != 3)
                updatedBoard[rowIndex - 1][col - 1].state = 2;
              if (updatedBoard[rowIndex - 1][col + 1].state != 3)
                updatedBoard[rowIndex - 1][col + 1].state = 2;
              if (updatedBoard[rowIndex + 1][col - 1].state != 3)
                updatedBoard[rowIndex + 1][col - 1].state = 2;
              updatedBoard[rowIndex][col].state = 3;
            }
          }
        }

        if (columnAllMatch && rowAllMatch) {
          for (let row = 0; row < updatedBoard.length; row++) {
            if (updatedBoard[row][columnIndex].value === clickedSquare.value) {
              if (updatedBoard[columnIndex + 1][row].state != 3)
                updatedBoard[columnIndex + 1][row].state = 2;
              if (updatedBoard[columnIndex + 1][row].state != 3)
                updatedBoard[columnIndex + 1][row].state = 2;
              if (updatedBoard[columnIndex - 1][row].state != 3)
                updatedBoard[columnIndex - 1][row].state = 2;
              if (updatedBoard[columnIndex][row + 1].state != 3)
                updatedBoard[columnIndex][row + 1].state = 2;
              if (updatedBoard[columnIndex][row - 1].state != 3)
                updatedBoard[columnIndex][row - 1].state = 2;
              if (updatedBoard[columnIndex + 1][row + 1].state != 3)
                updatedBoard[columnIndex + 1][row + 1].state = 2;
              if (updatedBoard[columnIndex - 1][row - 1].state != 3)
                updatedBoard[columnIndex - 1][row - 1].state = 2;
              if (updatedBoard[columnIndex - 1][row + 1].state != 3)
                updatedBoard[columnIndex - 1][row + 1].state = 2;
              if (updatedBoard[columnIndex + 1][row - 1].state != 3)
                updatedBoard[columnIndex + 1][row - 1].state = 2;
              updatedBoard[row][columnIndex].state = 3;
            }
          }
        }
      };

      checkAndUpdateCells();

      setBoard(updatedBoard);
    } else {
      updatedBoard[rowIndex][columnIndex] = {
        ...clickedSquare,
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
