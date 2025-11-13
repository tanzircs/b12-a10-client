import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import PublicLayout from "../Layouts/PublicLayout";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Forget from "../Pages/Forget";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/MyProfile";
import AllChallenges from "./../Pages/AllChallenges";
import ChallengeDetail from "../Pages/ChallengeDetail";
import AddChallenge from "../Pages/AddChallenge";
import JoinChallenge from "../Pages/JoinChallenge";


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <Forget />,
      },
      {
        path: "/challenges",
        element: <AllChallenges />,
      },

      {
        path: "/challenges/:id",
        element: <ChallengeDetail />,
      },
      {
        path: "/challenges/add",
        element: (
          <PrivateRoute>
            <AddChallenge />
          </PrivateRoute>
        ),
      },
      {
        path: "/challenges/join/:id",
        element: (
          <PrivateRoute>
            <JoinChallenge />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

    //   {
    //     path: "*",
    //     element: <ErrorPage />,
    //   },
    ],
  },
]);

export default router;
