import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getNowPlayingMovies, getPopularMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utils";

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
  margin: 50px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: -100px;
`;

const SliderTitle = styled.h2`
  width: 200px;
  height: 50px;
  position: absolute;
  background-color: blue;
  top: -50px;
`;

const Button = styled.div`
  width: 2%;
  height: 200px;
  background-color: red;
  z-index: 99;
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
  color: red;
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
  font-size: 48px;
  position: relative;
  top: -90px;
`;

const BigOverview = styled(motion.p)`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -90px;
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
  nowPlaying: "nowPlaying",
  latest: "latest",
  topRated: "topRated",
  upcoming: "upcoming",
};

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data: nowPlayingMovies, isLoading: nowPlayingMoviesLoading } =
    useQuery<IGetMovieResult>(
      ["movies", categories.nowPlaying],
      getNowPlayingMovies
    );
  const { data: latestMovies, isLoading: latestMoviesLoading } =
    useQuery<IGetMovieResult>(["movies", categories.latest], getPopularMovies);
  const [clickedRowMovies, setClickedRowMovies] = useState<IGetMovieResult>();
  const [clickedRowName, setClickedRowName] = useState<string>();
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [latestIndex, setLatestIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const decreaseNowPlayingIndex = (data: any) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = data.results.length - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 총 넘길 수 있는 index 수, 0번째 index부터 시작하므로 -1 해줌
      setNowPlayingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseNowPlayingIndex = (data: any) => {
    if (data) {
      if (leaving) return;
      setIsBack(false);
      toggleLeaving();
      const totalMovies = data.results.length - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 총 넘길 수 있는 index 수, 0번째 index부터 시작하므로 -1 해줌
      setNowPlayingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseLatestIndex = (data: any) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = data.results.length - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 총 넘길 수 있는 index 수, 0번째 index부터 시작하므로 -1 해줌
      setLatestIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseLatestIndex = (data: any) => {
    if (data) {
      if (leaving) return;
      setIsBack(false);
      toggleLeaving();
      const totalMovies = data.results.length - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 총 넘길 수 있는 index 수, 0번째 index부터 시작하므로 -1 해줌
      setLatestIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onOverlayClick = () => history.goBack();
  const onBoxClicked = (category: string, movieId: number) => {
    history.push(`/movies/${movieId}`);
    setClickedRowName(category);
    if (category === categories.nowPlaying) {
      setClickedRowMovies(nowPlayingMovies);
    } else if (category === categories.latest) {
      setClickedRowMovies(latestMovies);
    }
  };
  let clickedMovie =
    bigMovieMatch?.params.movieId &&
    clickedRowMovies?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {nowPlayingMoviesLoading || latestMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingMovies?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingMovies?.results[0].title}</Title>
            <Overview>{nowPlayingMovies?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <SliderTitle>nowPlayingMovies</SliderTitle>
            <Button
              onClick={() => decreaseNowPlayingIndex(nowPlayingMovies)}
            ></Button>
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
                key={nowPlayingIndex}
              >
                {nowPlayingMovies?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(
                    offset * nowPlayingIndex,
                    offset * nowPlayingIndex + offset
                  ) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.nowPlaying}
                      key={movie.id + categories.nowPlaying}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() =>
                        onBoxClicked(categories.nowPlaying, movie.id)
                      }
                      variants={BoxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Button
              onClick={() => increaseNowPlayingIndex(nowPlayingMovies)}
            ></Button>
          </Slider>
          <Slider>
            <SliderTitle>latestMovies</SliderTitle>
            <Button onClick={() => decreaseLatestIndex(latestMovies)}></Button>
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
                key={latestIndex}
              >
                {latestMovies?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(offset * latestIndex, offset * latestIndex + offset) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.latest}
                      key={movie.id + categories.latest}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(categories.latest, movie.id)}
                      variants={BoxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Button onClick={() => increaseLatestIndex(latestMovies)}></Button>
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
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
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

export default Home;
