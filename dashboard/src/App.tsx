import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import "./index.css";
import React from 'react';
import { SignIn } from "./containers/Login";
import { SignUp } from "./containers/Register";
import { Home } from "./containers/home";

function NoMatch() {
  return (
    <div className="white-page">
      <h2>Nothing to see here!</h2>
      <p>
        <div className="row-box">
          <Link to="/">Go to the home page</Link>
        </div>        
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello you use CQA dashboard!" }),
    Component() {
      return <Home />;
    },
  },
  {
    path: "/register",
    Component() {
      return <SignUp />;
    },
  },
  {
    path: "/login",
    Component() {
      return <SignIn />;
    },
  },
  {
    path: "*",
    Component() {
      return <NoMatch />;
    }
  },
]);

interface AuthContextType {
  token: string;
  logged: boolean;
}

let AuthContext = React.createContext<AuthContextType>({
  token: '',
  logged: false,
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}