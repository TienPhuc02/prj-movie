import { useState, useEffect } from "react";
import { callListMoviePopular, callSearchMovie } from "../../../server/api";
import ReactPaginate from "react-paginate";
import MovieCard from "../../movie/Popular/MovieCard";
import useDebounce from "../../hooks/useDebounce";

interface MovieCardType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
  key: number;
}
const MoviePages = () => {
  const [listMovieTrending, setListMovieTrending] = useState<[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  // const [itemOffset, setItemOffset] = useState(0);
  const itemPerPage = 20;
  const [pageCount, setPageCount] = useState<number>(0);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const handlePageClick = async (event: { selected: number }) => {
    setPage(event.selected + 1);
    if (searchQuery !== "") {
      setPage(event.selected + 1);
      await getAllListMovieFilter();
    }
  };
  const getAllListMovieTrending = async () => {
    const res = await callListMoviePopular(page);
    // console.log(res);
    if (res && res.data && res.data.results) {
      setListMovieTrending(res.data.results);
      setPage(res.data.page);
      setPageCount(Math.ceil(res.data.total_results / itemPerPage));
    }
  };
  const getAllListMovieFilter = async () => {
    if (searchQuery !== "") {
      const res = await callSearchMovie(searchQuery, page);
      console.log(res);
      if (res && res.data && res.data.results) {
        setListMovieTrending(res.data.results);
        setPageCount(Math.ceil(res.data.total_results / itemPerPage));
      }
    }
    if (searchQuery === "") {
      getAllListMovieTrending();
    }
  };
  useEffect(() => {
    getAllListMovieFilter();
  }, [debouncedSearchQuery, page]);
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const loading = !listMovieTrending;
  if (!listMovieTrending) return null;

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search"
            onChange={handleChangeFilter}
          />
        </div>
        <button className="p-4  bg-primary text-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          listMovieTrending.length > 0 &&
          listMovieTrending.map((item: MovieCardType) => {
            return <MovieCard key={item.id} item={item} />;
          })}
      </div>
      <div className="flex items-center justify-center mt-10 gap-x-5">
        <ReactPaginate
          className="pagination "
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default MoviePages;
