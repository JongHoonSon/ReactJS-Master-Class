import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface RouteState {
  m15: number;
  m30: number;
  h1: number;
  h6: number;
  h12: number;
  h24: number;
  d7: number;
  d30: number;
  y1: number;
}

const PriceHistoryBlock = styled.div<{ isPlus: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  & div:first-child {
    color: rgba(255, 255, 255, 0.6);
  }
  & div:last-child {
    color: ${(props) => (props.isPlus > 0 ? "#1abc9c" : "#e74c3c")};
  }
`;

function Price({ coinId }: PriceProps) {
  const { state } = useLocation<RouteState>();
  return (
    <>
      <PriceHistoryBlock isPlus={state.m15}>
        <div>15min ago</div>
        <div>{`${state.m15} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.m30}>
        <div>30min ago</div>
        <div>{`${state.m30} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.h1}>
        <div>1h ago</div>
        <div>{`${state.h1} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.h6}>
        <div>6h ago</div>
        <div>{`${state.h6} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.h12}>
        <div>12h ago</div>
        <div>{`${state.h12} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.h24}>
        <div>24h ago</div>
        <div>{`${state.h24} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.d7}>
        <div>7d ago</div>
        <div>{`${state.d7} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.d30}>
        <div>30d ago</div>
        <div>{`${state.d30} %`}</div>
      </PriceHistoryBlock>
      <PriceHistoryBlock isPlus={state.y1}>
        <div>1y ago</div>
        <div>{`${state.y1} %`}</div>
      </PriceHistoryBlock>
    </>
  );
}

export default Price;
