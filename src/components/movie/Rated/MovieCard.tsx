import { useNavigate } from "react-router-dom";

interface MovieCardRatedPropsType {
  item: {
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: string;
    id: number;
  };
}
const MovieCard = (props: MovieCardRatedPropsType) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleDetailMovie = (item: { id: number }) => {
    navigate(`/movies/${item.id}`);
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

export default MovieCard;
