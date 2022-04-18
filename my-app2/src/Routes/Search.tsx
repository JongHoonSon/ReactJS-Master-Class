import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMultiSearch, IGetMultiSearchResult } from "../api";
import { makeImagePath } from "../utils";
import MovieDetail from "./MovieDetail";
import SearchDetail from "./SearchDetail";

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
  cursor: pointer;
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
    scale: 1.05,
  },
};

const BigBox = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled(motion.div)`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled(motion.h3)`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 32px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled(motion.h4)`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 16px;
  position: relative;
  top: -50px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

function Search() {
  const location = useLocation();
  const onOverlayClick = () => history.goBack();
  const bigBoxMatch = useRouteMatch<{ id: string }>("/search/:id");
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
  const history = useHistory();
  const onBoxClicked = (id: number) => {
    history.push(`/search/${id}`);
    console.log(id);
  };
  let clickedMovie =
    bigBoxMatch?.params.id &&
    movieList?.find((movie) => movie.id === +bigBoxMatch.params.id);
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
                <AnimatePresence>
                  <Movie
                    variants={boxVariation}
                    layoutId={movie.id + ""}
                    initial="normal"
                    whileHover="hover"
                    onClick={() => onBoxClicked(movie.id)}
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
          <AnimatePresence>
            {bigBoxMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <BigBox
                  layoutId={bigBoxMatch.params.id + ""}
                  style={{
                    top: 100,
                  }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <SearchDetail />
                    </>
                  )}
                </BigBox>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </Wrapper>
  );
}

export default Search;
