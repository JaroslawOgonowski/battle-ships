import { hitCheck } from "./hitCheck";

export function opponentMove(
  board: { value: number; state: string }[][],
  setBoard: React.Dispatch<
    React.SetStateAction<
      {
        value: number;
        state: string;
      }[][]
    >
  >,
  ships: {
    id: string;
    src: string;
    state: number;
  }[],
  setShips: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        src: string;
        state: number;
      }[]
    >
  >,
  setTurnInfoTxt: React.Dispatch<React.SetStateAction<string>>,
  setTurnInfoState: React.Dispatch<React.SetStateAction<string>>,
  columnHeaders: string[],
  stats: {
    playerHits: number;
    playerMissed: number;
    opponentHits: number;
    opponentMissed: number;
  },
  setStats: React.Dispatch<
    React.SetStateAction<{
      playerHits: number;
      playerMissed: number;
      opponentHits: number;
      opponentMissed: number;
    }>
  >,
  yourTurn: boolean
) {
  const updatedBoard = [...board];
  let hitCount = 0;
  let hitCoordinates: { row: number; col: number }[] = [];
  const availableMoves = [];

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (updatedBoard[row][col].state === "Hit") {
        hitCount += 1;
        hitCoordinates.push({ row, col });
      }
      if (updatedBoard[row][col].state === "Initial") {
        availableMoves.push({ row, col });
      }
    }
  }

  if (hitCount === 0) {
    if (availableMoves.length === 0) {
      console.log("Brak dostępnych ruchów");
      return;
    }
  } else if (hitCount === 1) {
    const hitCoordinate = hitCoordinates[0];
    const directions = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ];
    availableMoves.length = 0;
    for (const [dx, dy] of directions) {
      const newRow = hitCoordinate.row + dy;
      const newCol = hitCoordinate.col + dx;
      if (
        newRow >= 0 &&
        newRow < 10 &&
        newCol >= 0 &&
        newCol < 10 &&
        updatedBoard[newRow][newCol].state === "Initial"
      ) {
        availableMoves.push({ row: newRow, col: newCol });
      }
    }
  } else if (hitCount > 1) {
    const commonRow = hitCoordinates.every(
      (coord) => coord.row === hitCoordinates[0].row
    )
      ? hitCoordinates[0].row
      : null;
    const commonCol = hitCoordinates.every(
      (coord) => coord.col === hitCoordinates[0].col
    )
      ? hitCoordinates[0].col
      : null;
    availableMoves.length = 0;
    if (commonRow !== null) {
      const minCol = Math.min(...hitCoordinates.map((coord) => coord.col));
      const maxCol = Math.max(...hitCoordinates.map((coord) => coord.col));
      if (
        minCol > 0 &&
        updatedBoard[commonRow][minCol - 1].state === "Initial"
      ) {
        availableMoves.push({ row: commonRow, col: minCol - 1 });
      }
      if (
        maxCol < 9 &&
        updatedBoard[commonRow][maxCol + 1].state === "Initial"
      ) {
        availableMoves.push({ row: commonRow, col: maxCol + 1 });
      }
    } else if (commonCol !== null) {
      const minRow = Math.min(...hitCoordinates.map((coord) => coord.row));
      const maxRow = Math.max(...hitCoordinates.map((coord) => coord.row));
      if (
        minRow > 0 &&
        updatedBoard[minRow - 1][commonCol].state === "Initial"
      ) {
        availableMoves.push({ row: minRow - 1, col: commonCol });
      }
      if (
        maxRow < 9 &&
        updatedBoard[maxRow + 1][commonCol].state === "Initial"
      ) {
        availableMoves.push({ row: maxRow + 1, col: commonCol });
      }
    }
  }

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  const { row: randomRow, col: randomColumn } = availableMoves[randomIndex];

  const clickedSquare = updatedBoard[randomRow][randomColumn];
  hitCheck(
    randomRow,
    randomColumn,
    updatedBoard,
    clickedSquare,
    setBoard,
    ships,
    setShips,
    stats.opponentHits,
    stats.opponentMissed,
    setStats,
    yourTurn
  );
  setBoard(updatedBoard);
  setTurnInfoTxt(`${columnHeaders[randomColumn]}${randomRow + 1}`);
  setTurnInfoState(`${updatedBoard[randomRow][randomColumn].state}`);
}
