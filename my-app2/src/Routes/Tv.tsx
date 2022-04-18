import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getAiringTodayTvs,
  getOnTheAirTvs,
  getPopularTvs,
  getTopRatedTvs,
  IGetTvResult,
} from "../api";
import { makeImagePath } from "../utils";
import MovieDetail from "./MovieDetail";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 30px;
`;

const Slider = styled.div`
  position: relative;
  margin: 50px 0px 70px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: -100px;
`;

const SliderTitle = styled.h2`
  width: 200px;
  height: 50px;
  position: absolute;
  background-color: transparent;
  top: -50px;
  left: 40px;
  text-transform: uppercase;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled.div`
  width: 2%;
  height: 200px;
  background-color: transparent;
  z-index: 99;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;

const Row = styled(motion.div)`
  display: grid;
  padding: 0 2%;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 64px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
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

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.innerWidth : window.innerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.innerWidth : -window.innerWidth,
  }),
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

const categories = {
  airingToday: "airingToday",
  onTheAir: "onTheAir",
  popular: "popular",
  topRated: "topRated",
};

function Tv() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data: airingTodayMovies, isLoading: airingTodayMoviesLoading } =
    useQuery<IGetTvResult>(
      ["movies", categories.airingToday],
      getAiringTodayTvs
    );
  const { data: onTheAirMovies, isLoading: onTheAirMoviesLoading } =
    useQuery<IGetTvResult>(["movies", categories.onTheAir], getOnTheAirTvs);
  const { data: popularMovies, isLoading: popularMoviesLoading } =
    useQuery<IGetTvResult>(["movies", categories.popular], getPopularTvs);
  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } =
    useQuery<IGetTvResult>(["movies", categories.topRated], getTopRatedTvs);
  const [clickedRowMovies, setClickedRowMovies] = useState<IGetTvResult>();
  const [clickedRowName, setClickedRowName] = useState<string>();
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [airingTodayIndex, setairingTodayIndex] = useState(0);
  const [onTheAirIndex, setonTheAirIndex] = useState(0);
  const [popularIndex, setpopularIndex] = useState(0);
  const [topRatedIndex, settopRatedIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const decreaseIndex = (category: string, data: any) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      let totalMovies = data.results.length;
      let maxIndex = Math.ceil(totalMovies / offset) - 1; // 총 넘길 수 있는 index 수, 0번째 index부터 시작하므로 -1 해줌
      if (category === categories.airingToday) {
        totalMovies = totalMovies - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
        setairingTodayIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (category === categories.onTheAir) {
        setonTheAirIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (category === categories.popular) {
        setpopularIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (category === categories.topRated) {
        settopRatedIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };
  const increaseIndex = (category: string, data: any) => {
    if (data) {
      if (leaving) return;
      setIsBack(false);
      toggleLeaving();
      let totalMovies = data.results.length;
      let maxIndex = Math.ceil(totalMovies / offset) - 1; // 총 넘길 수 있는 index 수, 0번째 index부터 시작하므로 -1 해줌
      if (category === categories.airingToday) {
        totalMovies = totalMovies - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
        setairingTodayIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (category === categories.onTheAir) {
        setonTheAirIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (category === categories.popular) {
        setpopularIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (category === categories.topRated) {
        settopRatedIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    }
  };
  const onOverlayClick = () => history.goBack();
  const onBoxClicked = (category: string, movieId: number) => {
    history.push(`/movies/${movieId}`);
    setClickedRowName(category);
    if (category === categories.airingToday) {
      setClickedRowMovies(airingTodayMovies);
    } else if (category === categories.onTheAir) {
      setClickedRowMovies(onTheAirMovies);
    } else if (category === categories.popular) {
      setClickedRowMovies(popularMovies);
    } else if (category === categories.topRated) {
      setClickedRowMovies(topRatedMovies);
    }
  };
  let clickedMovie =
    bigMovieMatch?.params.movieId &&
    clickedRowMovies?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {airingTodayMoviesLoading ||
      onTheAirMoviesLoading ||
      popularMoviesLoading ||
      topRatedMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              airingTodayMovies?.results[0].backdrop_path || ""
            )}
          >
            <Title>{airingTodayMovies?.results[0].name}</Title>
            <Overview>{airingTodayMovies?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <SliderTitle>Now Playing Movies</SliderTitle>
            <Button
              onClick={() =>
                decreaseIndex(categories.airingToday, airingTodayMovies)
              }
            >
              <span>{`<`}</span>
            </Button>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={isBack}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                custom={isBack}
                key={airingTodayIndex}
              >
                {airingTodayMovies?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(
                    offset * airingTodayIndex,
                    offset * airingTodayIndex + offset
                  ) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.airingToday}
                      key={movie.id + categories.airingToday}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() =>
                        onBoxClicked(categories.airingToday, movie.id)
                      }
                      variants={BoxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Button
              onClick={() =>
                increaseIndex(categories.airingToday, airingTodayMovies)
              }
            >
              <span>{`>`}</span>
            </Button>
          </Slider>
          <Slider>
            <SliderTitle>onTheAir Movies</SliderTitle>
            <Button
              onClick={() => decreaseIndex(categories.onTheAir, onTheAirMovies)}
            >
              <span>{`<`}</span>
            </Button>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={isBack}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                custom={isBack}
                key={onTheAirIndex}
              >
                {onTheAirMovies?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(
                    offset * onTheAirIndex,
                    offset * onTheAirIndex + offset
                  ) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.onTheAir}
                      key={movie.id + categories.onTheAir}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() =>
                        onBoxClicked(categories.onTheAir, movie.id)
                      }
                      variants={BoxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Button
              onClick={() => increaseIndex(categories.onTheAir, onTheAirMovies)}
            >
              <span>{`>`}</span>
            </Button>
          </Slider>
          <Slider>
            <SliderTitle>Top Rated Movies</SliderTitle>
            <Button
              onClick={() => decreaseIndex(categories.popular, popularMovies)}
            >
              <span>{`<`}</span>
            </Button>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={isBack}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                custom={isBack}
                key={popularIndex}
              >
                {popularMovies?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(offset * popularIndex, offset * popularIndex + offset) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.popular}
                      key={movie.id + categories.popular}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(categories.popular, movie.id)}
                      variants={BoxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Button
              onClick={() => increaseIndex(categories.popular, popularMovies)}
            >
              <span>{`>`}</span>
            </Button>
          </Slider>
          <Slider>
            <SliderTitle>topRated Movies</SliderTitle>
            <Button
              onClick={() => decreaseIndex(categories.topRated, topRatedMovies)}
            >
              <span>{`<`}</span>
            </Button>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={isBack}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                custom={isBack}
                key={topRatedIndex}
              >
                {topRatedMovies?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(
                    offset * topRatedIndex,
                    offset * topRatedIndex + offset
                  ) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.topRated}
                      key={movie.id + categories.topRated}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() =>
                        onBoxClicked(categories.topRated, movie.id)
                      }
                      variants={BoxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Button
              onClick={() => increaseIndex(categories.topRated, topRatedMovies)}
            >
              <span>{`>`}</span>
            </Button>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId + clickedRowName}
                  style={{
                    top: scrollY.get() + 100,
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
                      <BigTitle>{clickedMovie.name}</BigTitle>
                      <MovieDetail />
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
