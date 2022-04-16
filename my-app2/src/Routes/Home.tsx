import { useQuery } from "react-query";
import { getMovies, IGetMovieResult } from "../api";

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["moives", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);
  return (
    <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}>Home</div>
  );
}

export default Home;
