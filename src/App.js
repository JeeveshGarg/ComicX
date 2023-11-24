import HomePage from "./pages/HomePage";
import Loader from "./components/common/Loader";
import { Navigate } from "react-router-dom";
import { useGetUser } from "./lib/utils";

function App() {
  const { user, authLoading } = useGetUser();

  if (authLoading) {
    return <Loader />;
  }

  if (Boolean(user)) {
    return <HomePage />;
  }

  return <Navigate to="/login" replace />;
}

export default App;

//done