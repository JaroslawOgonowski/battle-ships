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
};

export const Board: React.FC<BoardProps> = ({ boardArray }) => {

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
