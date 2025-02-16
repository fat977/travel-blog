// routes.js
//import NotFoundPage from './pages/NotFoundPage';

import PrivateRoute from "./auth/PrivateRoute";
import About from "./pages/About/AboutUs";
import BlogPost from "./pages/BlogPost/BlogPost";
import PostDetails from "./pages/BlogPost/PostDetails/PostDetails";
import Contact from "./pages/Contact/Contact";
import DesDetails from "./pages/destinations/DesDetails/DesDetails";
import Destination from "./pages/destinations/Destination";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import HomeIndex from "./pages/HomeIndex/HomeIndex";
import Profile from "./pages/profile/Profile";
export const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeIndex />,
      },
      {
        path: "blog",
        element: <BlogPost />,
      },
      {
        path: "blog/:id",
        element: <PostDetails />,  
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "destinations",
        element: <Destination />,
      },
      {
        path: "destinations/:id",
        element: <DesDetails />,  
      },
      {
        path: "profile",  
        element: <PrivateRoute element={<Profile />} />,  
      },
    ],
  },
  { path: '*', element: <Error /> },  // Catch-all for 404 page
];
