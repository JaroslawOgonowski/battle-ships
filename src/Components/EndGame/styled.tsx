import styled from "styled-components";

export const Wrapper = styled.main`
  margin: 12vh auto;
  width: 50%;
  height: 65vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const EndGameMsgWin = styled.div`
  width: 90%;
  text-align: center;
  margin: 2vh 0 2vh 0;
  font-size: 2vw;
  color: #32b012;
  @media (max-width: 900px) {
    font-size: 18px;
  }
`;
export const EndGameMsgLose = styled(EndGameMsgWin)`
  color: #81090d;
`;

export const Stats = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
`
export const Image = styled.img`
  width: 15vh;
  height: 15vh;
  margin-top: 2vh;
  margin-bottom: 5vh;
`
export const Summary = styled.div`
width: 60%;
  font-size: 1.5vw;
  color: #11d014;
  @media (max-width: 900px) {
    font-size: 16px;
  }
`