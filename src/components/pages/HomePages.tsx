import MovieList from "../movie/NowPlaying/MovieList";
import MovieListRated from "../movie/Rated/MovieList";
import MovieListTrending from "../movie/Popular/MovieList";
import MovieListUpcoming from "../movie/Upcoming/MovieList";

const HomePages = () => {
  return (
    <>
      <section className="movies-layout   page-container pb-20">
        <h2 className="capitalize  text-white mb-10 text-3xl font-bold">
          Now Playing
        </h2>
        <MovieList />
      </section>
      <section className="movies-layout  text-white page-container pb-10">
        <h2 className="capitalize  text-white mb-10 text-3xl font-bold">
          Rated
        </h2>
        <MovieListRated />
      </section>
      <section className="movies-layout text-white page-container pb-10">
        <h2 className="capitalize  text-white mb-10 text-3xl font-bold">
          Trending
        </h2>
        <MovieListTrending />
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize  text-white mb-10 text-3xl font-bold">
          Upcoming
        </h2>
        <MovieListUpcoming />
      </section>
    </>
  );
};

export default HomePages;
