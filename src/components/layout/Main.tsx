import { Outlet } from "react-router-dom";
import Header from "./Header";
import "swiper/scss";

const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Main;
