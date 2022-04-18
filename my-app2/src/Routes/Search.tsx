import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getMultiSearch, IGetMultiSearchResult } from "../api";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const { data: searchResult, isLoading } = useQuery<IGetMultiSearchResult>(
    "SearchResult",
    () => getMultiSearch(keyword ? keyword : "")
  );
  console.log("searchResult", searchResult);
  return null;
}

export default Search;
