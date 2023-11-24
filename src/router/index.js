import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "../App";
import EditItem from "../pages/EditItem";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/common/ErrorFallback";
import Login from "../pages/Login";
import View from "../pages/View";
import ComicList from "../pages/ComicList";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Outlet />
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/comics",
        element: <ComicList />,
      },
      {
        path: "/edit/:id",
        element: <EditItem />,
      },
      {
        path: "/view/:id",
        element: <View />,
      },
      {
        path: "*",
        element: <ErrorFallback error={new Error("404: Page not found")} />,
      },
    ],
  },
]);

export default router;
