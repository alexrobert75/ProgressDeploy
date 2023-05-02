import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { createContext, useContext, useState } from "react";
import { Signup } from "./pages/Signup/Signup";
import { Passeval } from "./pages/Passeval/Passeval";
import { Profile } from "./pages/Profile/Profile";
import { EvaluationDetail } from "./pages/EvaluationDetail/EvaluationDetail";
import { Teacher } from "./pages/Teacher/Teacher";
import ModifyEvaluation from "./pages/Teacher/ModifyEvaluation";
import { Enableeval } from "./pages/Enableeval/Enableeval";
import { AnalyticView } from "./pages/AnalyticView/AnalyticView";


export const UserContext = createContext();

const Layout = () => {
  const [context, setContext] = useState({ userInfo: null, isLoggedIn: false });
  return (
    <div className="app">
      <UserContext.Provider value={[context, setContext]}>
        <Navbar />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <Profile /> },
      { path: "/passeval", element: <Passeval /> },
      { path: "/evaluation/:id", element: <EvaluationDetail /> },
      { path: "/teacher/profile", element: <Teacher /> },
      { path: "/teacher/evaluation/:id", element: <ModifyEvaluation /> },
      { path: "/teacher/enableeval", element: <Enableeval /> },
      { path: "/teacher/analytique", element: <AnalyticView /> },
      
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
