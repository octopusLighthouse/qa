import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import "./index.css";
import axios from 'axios';
import React from 'react';
import { Settings } from "./containers/Settings";
import { SignIn } from "./containers/Login";

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

function Home() {
  return (
    <div className="white-page">
      <h2>Home</h2>
      <div className="row-box">
        <div className="box">
          <Link to="/login">Login</Link>
        </div>
        <div className="box">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

function Register() {
  const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    try {
      const response = await axios.post('http://localhost:3000/auth/sign-up', { 
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="white-page">
      <h2>Register</h2>
      <div className="row-box">
        <div className="box">
          <Link to="/login">Login</Link>
        </div>        
        <div className="box">
          <Link to="/register">Register</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="column-box">
          <div className="row-box">
            <label>
              Email: <input name="email" type="text" />
            </label>
          </div>
          <div className="row-box">
            <label>
              Password: <input name="password" type="password" />
            </label>
          </div>
          <div className="row-box">
            <label>
              Repeat password: <input name="passwordRepeat" type="password" />
            </label>
          </div>
          <div className="empty" />
          <div className="row-box">
            <button type="submit">Register</button>
          </div>
        </div>
      </form>
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
    path: "/settings/create",
    Component() {
      return <Settings />;
    },
  },
  {
    path: "/register",
    Component() {
      return <Register />;
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

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}