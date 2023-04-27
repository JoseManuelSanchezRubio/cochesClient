import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage';
import Login from './routes/Login';
import Logup from './routes/Logup';
import Profile from './routes/Profile';
import ChooseCar from './routes/ChooseCar';
import Admin from './routes/Admin';
import MainPage, { loader as mainPageLoader, action as mainPageAction } from "./routes/MainPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: mainPageLoader,
    action: mainPageAction,
  },
  {
    path: "/booking",
    element: <ChooseCar />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/logup",
    element: <Logup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
