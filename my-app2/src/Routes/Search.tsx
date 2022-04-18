import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMultiSearch, IGetMultiSearchResult } from "../api";

const Movies = styled.div``;
const Tvs = styled.div``;

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
    <div>
      {isLoading ? (
        <span>isLoading...</span>
      ) : (
        <div>
          <Movies></Movies>
          <Tvs></Tvs>
        </div>
      )}
    </div>
  );
}

export default Search;
