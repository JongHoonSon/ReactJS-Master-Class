import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor?: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProp {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProp) {
  return <Container bgColor={bgColor} borderColor={borderColor}></Container>;
}

export default Circle;
