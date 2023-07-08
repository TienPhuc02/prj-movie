import { useEffect, useState } from "react";
import { callListMovieUpcoming } from "../../server/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
interface ListMovieBannerType {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}
const Banner = () => {
  const [listMovieBanner, setListMovieBanner] = useState<[]>([]);
  const navigate = useNavigate();
  const handleDetailMovie = (item: { id: number }) => {
    navigate(`/movies/${item.id}`);
  };
  const getAllListMovieBanner = async () => {
    const res = await callListMovieUpcoming();
    console.log(res);
    if (res && res?.data?.results) {
      setListMovieBanner(res?.data?.results);
    }
  };
  useEffect(() => {
    getAllListMovieBanner();
  }, []);

  return (
    <>
      <section className="banner h-[600px] page-container mb-20 ">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {listMovieBanner.length > 0 &&
            listMovieBanner.map((item: ListMovieBannerType) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="w-full h-full rounded-lg relative">
                    <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="text-white absolute left-5 bottom-5 w-full">
                      <h2 className="font-bold text-3xl mb-5">{item.title}</h2>
                      <div className="flex items center gap-x-3 mb-8">
                        <span className="px-4 py-2 border border-white rounded-md">
                          Adventure
                        </span>
                        <span className="px-4 py-2 border border-white rounded-md">
                          Adventure
                        </span>
                        <span className="px-4 py-2 border border-white rounded-md">
                          Adventure
                        </span>
                      </div>
                      <button
                        onClick={() => handleDetailMovie(item)}
                        className="py-3 px-6 rounded-lg bg-primary text-white font-medium"
                      >
                        Watch now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </section>
    </>
  );
};

export default Banner;
