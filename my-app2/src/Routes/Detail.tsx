import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMovieDetail } from "../api";

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Detail() {
  const movieMatch = useRouteMatch<{ movieId: string }>(`/movies/:movieId`);
  const { data: info, isLoading } = useQuery<IGetMovieDetail>(
    "MovieDetail",
    () => getMovieDetail(movieMatch?.params.movieId)
  );
  console.log("info", info);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Info>
          <h2 style={{ fontStyle: "italic" }}>{info?.tagline}</h2>
          <ul>
            {info?.genres.map((genre) => (
              <li>{genre.name}</li>
            ))}
          </ul>
          <h2>{`run time : ${info?.runtime}`}</h2>
        </Info>
      )}
    </div>
  );
}

export default Detail;
