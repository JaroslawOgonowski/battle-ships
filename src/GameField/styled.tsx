import styled from "styled-components";

export const MainTitle = styled.h1`
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 1vh 0;
  text-transform: uppercase;
  color: #26f80bf8;
`;
export const StyledGameField = styled.div`
  margin: 3vh auto;
  width: 90%;
  display: flex;
  gap: 5vw;
  align-items: center;
  justify-content: center;
`;

export const SingleBoard = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 2vw;
  color: #2ad513f8;
  text-align: center;
  text-transform: uppercase;
`;

export const DestroyedShips = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-height: 8vh;
  flex-wrap: wrap;
`;

export const ShipImage = styled.img`
transition: 500ms;
height: 20px;
width: auto;
filter: hue-rotate(270deg) contrast(2);
`