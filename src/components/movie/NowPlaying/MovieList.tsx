import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { callListMovie } from "../../../server/api";
interface ItemMovieType {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
}
const MovieList = () => {
  const [listMovie, setListMovie] = useState([]);
  const getAllListNow = async () => {
    const res = await callListMovie();
    if (res && res?.data && res?.data?.results) {
      setListMovie(res.data.results);
    }
  };
  useEffect(() => {
    getAllListNow();
  }, []);
  return (
    <div>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {listMovie.length > 0 &&
            listMovie.map((item: ItemMovieType) => {
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

export default MovieList;
