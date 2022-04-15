import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {};

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]); // x가 -800일 때 2, 0일 때 1, 800일 때 0을 반환함
  useEffect(() => {
    rotateZ.onChange(() => console.log(rotateZ.get()));
  }, [x]);
  return (
    <Wrapper>
      <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin></Box>
    </Wrapper>
  );
}

export default App;
