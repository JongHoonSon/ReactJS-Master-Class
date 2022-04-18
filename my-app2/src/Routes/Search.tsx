import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMultiSearch, IGetMultiSearchResult } from "../api";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 100px;
`;

const MovieRow = styled.div`
  margin-bottom: 200px;
  background-color: red;
`;

const Movies = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background-color: blue;
`;

const Movie = styled.div`
  padding: 20px;
  background-color: white;
  color: black;
`;

const TvRow = styled.div``;

const Title = styled.div`
  width: 300px;
  height: 50px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const { data: searchResult, isLoading } = useQuery<IGetMultiSearchResult>(
    "SearchResult",
    () => getMultiSearch(keyword ? keyword : "")
  );
  console.log("searchResult", searchResult);
  const movieList = new Array();
  const tvList = new Array();
  searchResult?.results.map((result) =>
    result.title ? movieList.push(result) : tvList.push(result)
  );
  return (
    <Wrapper>
      {isLoading ? (
        <span>isLoading...</span>
      ) : (
        <div>
          <MovieRow>
            <Title>Search from Movies</Title>
            <hr />
            <Movies>
              {movieList.map((movie) => (
                <Movie>{movie.title}</Movie>
              ))}
            </Movies>
          </MovieRow>
          <TvRow>
            <Title>Search from TV Shows</Title>
            <hr />
          </TvRow>
        </div>
      )}
    </Wrapper>
  );
}

export default Search;
