import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import { callListMoviePopularHome } from "../../../server/api";
interface MovieTrendingType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
}
const MovieListTrending = () => {
  const [listMovieTrending, setListMovieTrending] = useState<[]>([]);
  const getAllListMovieTrending = async () => {
    const res = await callListMoviePopularHome();
    if (res && res.data && res.data.results) {
      setListMovieTrending(res.data.results);
    }
  };
  useEffect(() => {
    getAllListMovieTrending();
  }, []);
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {listMovieTrending.length > 0 &&
          listMovieTrending.map((item: MovieTrendingType) => {
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

export default MovieListTrending;
