import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import PublicLayout from "../Layouts/PublicLayout";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Forget from "../Pages/Forget";


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      //   {
      //     path: "/detailes/:id",
      //     element: (
      //       <PrivateRoute>
      //         <SkillDetailes />
      //       </PrivateRoute>
      //     ),
      //   },
      //   {
      //     path: "/my-profile",
      //     element: (
      //       <PrivateRoute>
      //         <MyProfile />
      //       </PrivateRoute>
      //     ),
      //   },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
        {
          path: "/forgot-password",
          element: <Forget/>,
        },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
