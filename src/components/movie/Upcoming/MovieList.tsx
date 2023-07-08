import { useEffect, useState } from "react";
import { callListMovieUpcoming } from "../../../server/api";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
interface MovieTrendingType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
}
const MovieListUpcoming = () => {
  const [listMovieUpcoming, setListMovieUpcoming] = useState<[]>([]);
  const getAllListMovieUpcoming = async () => {
    const res = await callListMovieUpcoming();

    if (res && res.data && res.data.results) {
      setListMovieUpcoming(res.data.results);
    }
  };
  useEffect(() => {
    getAllListMovieUpcoming();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {listMovieUpcoming.length > 0 &&
          listMovieUpcoming.map((item: MovieTrendingType) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />;
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
export default MovieListUpcoming;
