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

const Banner = styled.div`
  height: 100vh;
`;

const Title = styled.h2``;

const Overview = styled.p``;

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["moives", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner>
            <Title></Title>
            <Overview></Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
