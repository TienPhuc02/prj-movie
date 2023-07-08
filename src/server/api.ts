import axios from "../utils/CustomAPI";

export const callListMovie = () => {
  return axios.get(
    "/movie/now_playing?api_key=60b543782a96ada8877d99963921d3c8"
  );
};
export const callListMovieRated = () => {
  return axios.get("/movie/top_rated?api_key=60b543782a96ada8877d99963921d3c8");
};
export const callListMoviePopular = (page: number) => {
  return axios.get(
    `movie/popular?api_key=60b543782a96ada8877d99963921d3c8&page=${page}`
  );
};
export const callListMoviePopularHome = () => {
  return axios.get(`movie/popular?api_key=60b543782a96ada8877d99963921d3c8`);
};
export const callListMovieUpcoming = () => {
  return axios.get("movie/upcoming?api_key=60b543782a96ada8877d99963921d3c8");
};
export const callListMovieLatest = () => {
  return axios.get("movie/latest?api_key=60b543782a96ada8877d99963921d3c8");
};
export const callDetailMovieDetail = (id: number) => {
  return axios.get(`movie/${id}?api_key=60b543782a96ada8877d99963921d3c8`);
};
export const callListCaster = (id: number) => {
  return axios.get(
    `movie/${id}/credits?api_key=60b543782a96ada8877d99963921d3c8`
  );
};
export const callVideoMovie = (id: number) => {
  return axios.get(
    `movie/${id}/videos?api_key=60b543782a96ada8877d99963921d3c8`
  );
};
export const callSimilarMovie = (id: number) => {
  return axios.get(
    `movie/${id}/similar?api_key=60b543782a96ada8877d99963921d3c8`
  );
};
export const callSearchMovie = (query: string, page: number) => {
  return axios.get(
    `search/movie?api_key=60b543782a96ada8877d99963921d3c8&query=${query}&page=${page}`
  );
};
