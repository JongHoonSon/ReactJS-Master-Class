import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMultiSearch, IGetMultiSearchResult } from "../api";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 100px;
`;
const Movies = styled.div`
  margin-bottom: 200px;
`;
const Tvs = styled.div``;
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
          <Movies>
            <Title>Search from Movies</Title>
            <hr />
          </Movies>
          <Tvs>
            <Title>Search from TV Shows</Title>
            <hr />
          </Tvs>
        </div>
      )}
    </Wrapper>
  );
}

export default Search;
