import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import { callListMovieRated } from "../../../server/api";
import { useEffect, useState } from "react";
interface ListMovieListType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
}
const MovieListRated = () => {
  const [listMovieRated, SetListMovieRated] = useState<[]>([]);
  const getListMovieRate = async () => {
    const res = await callListMovieRated();
    
    if (res && res.data && res.data.results) {
      SetListMovieRated(res.data.results);
    }
  };
  useEffect(() => {
    getListMovieRate();
  }, []);

  return (
    <div>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {listMovieRated.length > 0 &&
            listMovieRated.map((item: ListMovieListType) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieListRated;
