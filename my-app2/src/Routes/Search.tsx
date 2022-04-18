import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMultiSearch, IGetMultiSearchResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 100px;
`;

const MovieRow = styled.div`
  margin-bottom: 200px;
`;

const Movies = styled.ul`
  display: grid;
  width: 1600px;
  grid-template-columns: repeat(8, 1fr);
`;

const Movie = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  padding: 20px;
  height: 400px;
  width: 200px;
  border-radius: 3px;
  overflow: hidden;
  margin: 1px;
  background-position: center center;
  color: black;
`;

const TvRow = styled.div``;

const Title = styled.div`
  width: 300px;
  height: 50px;
`;

const boxVariation = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
};

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
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
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
                <AnimatePresence onExitComplete={toggleLeaving}>
                  <Movie
                    variants={boxVariation}
                    initial="normal"
                    whileHover="hover"
                    bgPhoto={makeImagePath(movie.poster_path, "w500")}
                  ></Movie>
                </AnimatePresence>
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
