import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./routes/Dashboard";
import Header from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);

export default router;
