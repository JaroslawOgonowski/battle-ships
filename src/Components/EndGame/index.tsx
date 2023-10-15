import { MainTitle } from "../GameField/styled";
import { InterfaceButton } from "../GameInterface/styled";
import {
  EndGameMsgLose,
  EndGameMsgWin,
  Image,
  Stats,
  Summary,
  Wrapper,
} from "./styled";
import winImg from "./images/cruise-outline-svgrepo-com.svg";
import loseImg from "./images/6150297.png";
import { loseMsg, summary, winMsg } from "./messages";
type EndGameProps = {
  yourTurn: boolean;
  stats: {
    playerHits: number;
    playerMissed: number;
    opponentHits: number;
    opponentMissed: number;
  };
};

const randomLoseIndex = Math.floor(Math.random() * loseMsg.length);
const randomWinIndex = Math.floor(Math.random() * winMsg.length);

function refreshPage() {
  window.location.reload();
}

export const Endgame: React.FC<EndGameProps> = ({
  yourTurn,
  stats,
}) => {

 
  
  return (
    <Wrapper>
      <MainTitle>📡 Battle ships ⚓</MainTitle>
      {!yourTurn ? (
        <EndGameMsgWin>You Win</EndGameMsgWin>
      ) : (
        <EndGameMsgLose>You Lose</EndGameMsgLose>
      )}
      {!yourTurn ? (
        <>
          <EndGameMsgWin>{winMsg[randomWinIndex]}</EndGameMsgWin>
          <Stats>
            <Image src={winImg} />
            <Summary>{summary(yourTurn, stats)}</Summary>
          </Stats>
        </>
      ) : (
        <>
          <EndGameMsgLose>{loseMsg[randomLoseIndex]}</EndGameMsgLose>
          <Stats>
            <Image src={loseImg} />
            <Summary>{summary(yourTurn, stats)}</Summary>
          </Stats>
        </>
      )}
      <InterfaceButton onClick={() => refreshPage()}>
        Play Again
      </InterfaceButton>
    </Wrapper>
  );
};
