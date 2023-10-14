import { Content, Turn, Wrapper } from "./styled";

type TurnInfoProps = {
  yourTurn: boolean;
  turnInfoTxt: string;
  turnInfoState: string;
};

export const TurnInfo: React.FC<TurnInfoProps> = ({
  yourTurn,
  turnInfoTxt,
  turnInfoState,
}) => {
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
      <Turn>Actually:</Turn>
      <Content>{yourTurn ? "Your Turn" : "Opponent Turn"}</Content>
    </Wrapper>
  );
};
