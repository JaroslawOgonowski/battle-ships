import { Board } from "../Board";
import { DestroyedShips, MainTitle, SingleBoard, StyledGameField, Title } from "./styled";

export const GameField = () => {
  const initialBoard: { value: number; state: number }[][] = [];

  for (let i = 0; i < 10; i++) {
    initialBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      initialBoard[i][j] = { value: 0, state: 0 };
    }
  }

  return (
    <>
      <MainTitle>📡 Battle ships ⚓</MainTitle>
      <StyledGameField>
        <SingleBoard>
          <Title>Your board</Title>
          <Board boardArray={initialBoard} />
          <Title>Destroyed Ships</Title>
          <DestroyedShips></DestroyedShips>
        </SingleBoard>

        <SingleBoard>
          <Title>Oponent board</Title>
          <Board boardArray={initialBoard} oponentBoard/>
          <Title>Destroyed Ships</Title>
          <DestroyedShips></DestroyedShips>
        </SingleBoard>
      </StyledGameField>
    </>
  );
};
