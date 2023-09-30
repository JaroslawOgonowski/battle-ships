import React, { useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { colorSwitcher } from "./colorSwitcher";

type BoardProps = {
  boardArray: number[][];
};

export const Board: React.FC<BoardProps> = ({ boardArray }) => {
  const [board, setBoard] = useState(boardArray);

  const columnHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rowHeaders = Array.from({ length: 11 }, (_, i) => i+1);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][columnIndex] = 2; // Ustaw odpowiedni stan, np. 2 oznacza pudło
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
                color={colorSwitcher(cell)}
                data-coordinates={`(${columnHeaders[columnIndex]}, ${rowIndex+1})`} // Przekazanie współrzędnych
              >
                {cell}
              </StyledCell>
            ))}
          </tr>
        ))}
      </TBody>
    </Table>
  );
};
