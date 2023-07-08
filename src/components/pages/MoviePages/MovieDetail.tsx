import { useEffect } from "react";
import {
  callDetailMovieDetail,
  callListCaster,
  callSimilarMovie,
  callVideoMovie,
} from "../../../server/api";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

interface VideoMovieType {
  id: number;
  key: string;
  name: string;
}
interface MovieDetailType {
  backdrop_path: string;
  poster_path: string;
  title: string;
  genres: [];
  name: string;
  id: number;
  overview: string;
  profile_path: string;
  setParam: React.Dispatch<React.SetStateAction<number>>;
}
interface MovieSimilarPropsType {
  item: {
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: string;
    id: number;
  };
  setParam: React.Dispatch<React.SetStateAction<number>>;
}
interface MovieSimilarType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
  setParam: React.Dispatch<React.SetStateAction<number>>;
}
interface CasterPropsType {
  id: number;
  profile_path: string;
  name: string;
}
const MovieDetail = () => {
  const url: string = window.location.href;
  const [param, setParam] = useState(+url.split("/movies/")[1]);
  const [movieDetailData, setMovieDetailData] =
    useState<MovieDetailType | null>(null);
  useEffect(() => {
    const getMovieDetail = async () => {
      const res = await callDetailMovieDetail(param);
      if (res && res.data) {
        setMovieDetailData(res.data);
      }
    };

    getMovieDetail();
  }, [param]);
  if (!movieDetailData) return null;
  const { backdrop_path, poster_path, title, genres, overview } =
    movieDetailData;
  return (
    <div className="py-10">
      {movieDetailData && (
        <>
          <div className="w-full h-[700px] relative">
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div
              className="w-full h-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path}?api_key=60b543782a96ada8877d99963921d3c8)`,
              }}
            ></div>
          </div>
          <div className="w-full h-[300px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}?api_key=60b543782a96ada8877d99963921d3c8`}
              className="w-full h-full object-cover rounded-xl"
              alt=""
            />
          </div>
          <h1 className="text-white text-3xl font-bold mb-10 text-center">
            {title}
          </h1>
          <div className="flex justify-center items-center flex-center gap-x-5 mb-10">
            {genres.length > 0 &&
              genres.map((item: MovieDetailType) => {
                return (
                  <span
                    key={item.id}
                    className="py-2 px-4  rounded-xl border-primary text-white inline-block border"
                  >
                    {item.name}
                  </span>
                );
              })}
          </div>
          <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
            {overview}
          </p>
          <div>
            <Caster id={param} profile_path={""} name={""} />
          </div>
          <div>
            <VideoMovie id={param} key={""} name={""} />
          </div>
          <h3 className="mt-10 text-3xl">Similar Movie</h3>
          <div>
            <MovieListSimilar
              id={param}
              poster_path={""}
              title={""}
              release_date={""}
              vote_average=""
              key={0}
              setParam={setParam}
            />
          </div>
        </>
      )}
    </div>
  );
};
const Caster = (props: CasterPropsType) => {
  const { id } = props;
  const [listCaster, setListCaster] = useState([]);
  useEffect(() => {
    const getListCaster = async () => {
      const res = await callListCaster(id);
      if (res && res.data) {
        setListCaster(res.data.cast);
      }
    };

    getListCaster();
  }, [id]);
  //   console.log(listCaster);
  if (listCaster && listCaster.length <= 0) return null;
  return (
    <>
      <h2 className="text-center text-3xl mb-10">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {listCaster.length > 0 &&
          listCaster.slice(0, 4).map((item: CasterPropsType) => {
            return (
              <div className="cast-item" key={item.id}>
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/original${item?.profile_path}?api_key=60b543782a96ada8877d99963921d3c8`
                      : ""
                  }
                  alt=""
                  className="w-full h-[350px] object-cover rounded-lg mb-3"
                />
                <h3>{item.name}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

const MovieListSimilar = (props: MovieSimilarType) => {
  const { id, setParam } = props;
  const [listMovieSimilar, setListMovieSimilar] = useState<[]>([]);
  useEffect(() => {
    const getAllListMovieSimilar = async () => {
      const res = await callSimilarMovie(id);
      if (res && res.data && res.data.results) {
        setListMovieSimilar(res.data.results);
      }
    };

    getAllListMovieSimilar();
  }, [id]);
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {listMovieSimilar.length > 0 &&
          listMovieSimilar.map((item: MovieSimilarType) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard setParam={setParam} item={item} />;
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
const MovieCard = (props: MovieSimilarPropsType) => {
  const { item, setParam } = props;
  const navigate = useNavigate();
  const handleDetailMovie = async (item: { id: number }) => {
    navigate(`/movies/${item.id}`);
    setParam(item.id);
  };
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white select-none h-full">
      <img
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className=" text-2xl font-bold mb-3">{item.title}</h3>
        <div className=" text-xm opacity-50 flex items-center justify-between mb-10">
          <span>{item.release_date}</span>
          <span>{item.vote_average}</span>
        </div>
        <button
          onClick={() => handleDetailMovie(item)}
          className="py-3 px-6 rounned-lg capitalize bg-primary w-full rounded-lg mt-auto"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};
const VideoMovie = (props: VideoMovieType) => {
  const [results, setResults] = useState<[]>([]);
  const { id } = props;

  useEffect(() => {
    const getListVideo = async () => {
      const res = await callVideoMovie(id);
      console.log(res);
      if (res && res.data) {
        setResults(res.data.results);
      }
    };
    getListVideo();
  }, [id]); // Empty dependency array
  if (!results) return null;
  return (
    <div>
      {results.length > 0 &&
        results.slice(0, 1).map((item: VideoMovieType) => {
          return (
            <div key={item.id}>
              <h3 className="mb-5 text-xl font-medium inline-block text-white bg-secondary">
                {item.name}
              </h3>
              <div className="flex flex-col gap-10">
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="956"
                    height="538"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Youtube Play Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    frameBorder={"0"}
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MovieDetail;
