import React, { useEffect, useState } from "react";
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
  const [lastTurnInfoTxt, setLastTurnInfoTxt] = useState<string | null>(null);
  const [lastTurnInfoState, setLastTurnInfoState] = useState<string | null>(
    null
  );

  // Przechowujemy poprzednie stany w stanie komponentu
  const [previousTurnInfoTxt, setPreviousTurnInfoTxt] = useState<string | null>(
    null
  );
  const [previousTurnInfoState, setPreviousTurnInfoState] = useState<
    string | null
  >(null);

  useEffect(() => {
    // Aktualizujemy lastTurnInfoTxt tylko, jeśli previousTurnInfoTxt jest zdefiniowane
    if (previousTurnInfoTxt !== null) {
      setLastTurnInfoTxt(previousTurnInfoTxt);
    }

    // Aktualizujemy lastTurnInfoState tylko, jeśli previousTurnInfoState jest zdefiniowane
    if (previousTurnInfoState !== null) {
      setLastTurnInfoState(previousTurnInfoState);
    }

    // Zaktualizuj previousTurnInfoTxt i previousTurnInfoState, aby przechować poprzednie stany
    setPreviousTurnInfoTxt(turnInfoTxt);
    setPreviousTurnInfoState(turnInfoState);
  }, [yourTurn, turnInfoTxt, turnInfoState]);

  return (
    <Wrapper>
      <Turn>
        Last turns:
        <br />
        <br />
        {!yourTurn ? "Opponent Last Move" : "Your Last Move"}
      </Turn>
      <Content>
        <div>{lastTurnInfoTxt}</div>
        {lastTurnInfoState}
      </Content>
      <Turn>
        {yourTurn ? "Last Opponent Move" : "Your Last Move"}
        <br />
        <div>{turnInfoTxt}</div>
        {turnInfoState}
        <br />
        <br />
        {yourTurn ? "Now Time for your move..." : "Wait for oponent move..."}
      </Turn>
    </Wrapper>
  );
};
