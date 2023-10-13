
import { InterfaceButton, Wrapper } from "./styled";

type GameInterfaceProps = {
  setGameOn: React.Dispatch<React.SetStateAction<boolean>>;
  board: { value: number; state: string }[][];
  setBoard: React.Dispatch<
    React.SetStateAction<{ value: number; state: string }[][]>
  >;
};

export const GameInterface: React.FC<GameInterfaceProps> = ({
  setGameOn,
  board,
  setBoard,
}) => {
  const startGame = () => {
    setGameOn(true);
  };

  const reroll = () => {
    setBoard(board);
  }

  return (
    <Wrapper>
      <InterfaceButton onClick={() => startGame()}>Start game ▶</InterfaceButton>
      <InterfaceButton onClick={() => reroll()}>
        Reroll ships position ↻
      </InterfaceButton>
    </Wrapper>
  );
};
