import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMovieResult } from "../api";

const Wrapper = styled.div`
  background-color: black;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["moives", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);
  return (
    <Wrapper style={{ backgroundColor: "whitesmoke", height: "200vh" }}>
      Home
    </Wrapper>
  );
}

export default Home;
