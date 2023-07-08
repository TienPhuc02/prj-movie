import ReactDOM from "react-dom/client";

import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePages from "./components/pages/HomePages";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import MoviePages from "./components/pages/MoviePages/MoviePages";
import MovieDetail from "./components/pages/MoviePages/MovieDetail";

const router = createBrowserRouter([
  {
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Banner />
            <HomePages />
          </>
        ),
      },
      {
        path: "/movies",
        element: <MoviePages></MoviePages>,
      },
      {
        path: "/movies/:slug",
        element: <MovieDetail></MovieDetail>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
