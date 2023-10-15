import { Content, Stats, Turn, Wrapper } from "./styled";

type TurnInfoProps = {
  yourTurn: boolean;
  turnInfoTxt: string;
  turnInfoState: string;
  stats: {
    playerHits: number;
    playerMissed: number;
    opponentHits: number;
    opponentMissed: number;
  };
};

export const TurnInfo: React.FC<TurnInfoProps> = ({
  yourTurn,
  turnInfoTxt,
  turnInfoState,
  stats: { playerHits, playerMissed, opponentHits, opponentMissed },
}) => {
  const hitRatio = (statHits: number, statMissed: number) => {
    if (statHits + statMissed === 0) return "-";
    else return ((statHits / (statHits + statMissed)) * 100).toFixed(2) + "%";
  };

  return (
    <Wrapper>
      <Turn>
        Last turn:
        <br />
      </Turn>
      <Content>
        <div>{turnInfoTxt}</div>
        {turnInfoState}
      </Content>
      <Turn>Actually: {yourTurn ? "Your Turn" : "Opponent Turn"}</Turn>
      <Stats>
        <Turn>
          Opponent
          <br /> Stats:
          <Content>Hits:{" " + opponentHits} </Content>
          <Content>Missed:{" " + opponentMissed} </Content>
          <Content>
            Hit Ratio:
            <br />
            {hitRatio(opponentHits, opponentMissed)}
          </Content>
        </Turn>
        <Turn>
          Your
          <br /> Stats:
          <Content>Hits:{" " + playerHits} </Content>
          <Content>Missed:{" " + playerMissed} </Content>
          <Content>
            Hit Ratio:
            <br />
            {hitRatio(playerHits, playerMissed)}
          </Content>
        </Turn>
      </Stats>
    </Wrapper>
  );
};
