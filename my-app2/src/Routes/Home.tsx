import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMovieResult } from "../api";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["moives", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);
  return (
    <Wrapper style={{ backgroundColor: "whitesmoke", height: "200vh" }}>
      {isLoading ? <Loader>Loading...</Loader> : null}
    </Wrapper>
  );
}

export default Home;
