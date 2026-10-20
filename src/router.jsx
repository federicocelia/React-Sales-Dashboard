import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./routes/Dashboard";
import Header from "./components/Header";
import RootRedirect from "./routes/RootRedirect";
import ProtectedRoot from "./components/ProtectedRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/signin",
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
        <ProtectedRoot>
          <Header />
          <Dashboard />
        </ProtectedRoot>
      </>
    ),
  },
]);

export default router;
