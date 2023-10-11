import styled, { keyframes } from "styled-components";

export const Table = styled.table`
  transition: 500ms;
  border-collapse: collapse;
`;

export const TBody = styled.tbody`
  position: relative;
`;

const scaleUp = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  95% {
    transform: translate(-50%, -50%);
    width: 320px;
    height: 320px;
  }

  100%{
    visibility: 0;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 320px;
  }
`;

const scaleUpMin = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  95% {
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
  }

  100%{
    visibility: 0;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
  }
`;

export const Circle = styled.div`
  width: 1px;
  height: 1px;
  border: 5px dotted #931206;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  animation: ${scaleUp} 3s ease-in-out infinite;
  background: none;
  pointer-events: none;
  
  @media (max-width: 420px) {
    animation: ${scaleUpMin} 3s ease-in-out infinite;
  }
`;

export const TableHeader = styled.th`
  width: 30px;
  height: 30px;
  border: 2px solid #20c807ea;
  background-color: rgb(0, 0, 0);
  color: #34f516f8;
  text-align: center;

  @media (max-width: 420px) {
    width: 20px;
    height: 20px;
  }
`;

export const StyledCell = styled.td`
  cursor: pointer;
  width: 30px;
  height: 30px;
  transition: 500ms;
  border: 2px solid #20c807ea;
  background-color: ${(props) => props.color || "black"};
  position: relative;

  &:hover {
    filter: brightness(140%);
    z-index: 1;
    &::after {
      content: attr(data-coordinates);
      text-align: center;
      width: 36px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #000000;
      color: #e8e8e8;
      padding: 2px 4px;
      font-size: 12px;
      border-radius: 4px;
    }
  }

  @media (max-width: 420px) {
    width: 20px;
    height: 20px;
  }
`;

export const CellContent = styled.td`
  display: none;
`;

export const SingleBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: center;
  justify-content: center;

  @media (max-width: 1100px) {
    margin-bottom: 10vh;
  }
`;

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 2vw;
  color: #2ad513f8;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 900px) {
    font-size: 18px;
    margin-top: 5vh;
  }
`;

export const Ships = styled.div`
  width: 85%;
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
`;
