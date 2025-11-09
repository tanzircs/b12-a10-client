import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import PublicLayout from "../Layouts/PublicLayout";


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
    //   {
    //     path: "/login",

    //     Component: LoginAuth,
    //   },
    //   {
    //     path: "/register",
    //     Component: RegisterAuth,
    //   },
    //   {
    //     path: "/forgot-password",
    //     element: <ForgotPassword />,
    //   },
    //   {
    //     path: "*",
    //     element: <ErrorPage />,
    //   },
    ],
  },
]);

export default router;
