import { MainTitle } from "../GameField/styled";
import { EndGameMsgLose, EndGameMsgWin, Wrapper } from "./styled";

type EndGameProps = {
  yourTurn: boolean;
};

export const Endgame: React.FC<EndGameProps> = ({ yourTurn }) => {
  return (
    <Wrapper>
      <MainTitle>📡 Battle ships ⚓</MainTitle>
      {yourTurn ? <EndGameMsgWin>You Win</EndGameMsgWin> : <EndGameMsgLose>You Lose</EndGameMsgLose>}
    </Wrapper>
  );
};
