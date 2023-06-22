import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  Link,
} from "react-router-dom";
import "./index.css";

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

function Login() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //event.preventDefault();

    //let formData = new FormData(event.currentTarget);
    //let username = formData.get("username") as string;

    // auth.signin(username, () => {
    //   // Send them back to the page they tried to visit when they were
    //   // redirected to the login page. Use { replace: true } so we don't create
    //   // another entry in the history stack for the login page.  This means that
    //   // when they get to the protected page and click the back button, they
    //   // won't end up back on the login page, which is also really nice for the
    //   // user experience.
    //   navigate(from, { replace: true });
    // });
  }

  return (
    <div className="white-page">
      <h2>Login</h2>
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
              Username: <input name="username" type="text" />
            </label>
          </div>
          <div className="row-box">
            <label>
              Password: <input name="username" type="password" />
            </label>
          </div>
          <div className="empty" />
          <div className="row-box">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Register() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //event.preventDefault();

    //let formData = new FormData(event.currentTarget);
    //let username = formData.get("username") as string;

    // auth.signin(username, () => {
    //   // Send them back to the page they tried to visit when they were
    //   // redirected to the login page. Use { replace: true } so we don't create
    //   // another entry in the history stack for the login page.  This means that
    //   // when they get to the protected page and click the back button, they
    //   // won't end up back on the login page, which is also really nice for the
    //   // user experience.
    //   navigate(from, { replace: true });
    // });
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
              Username: <input name="username" type="text" />
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
    path: "/register",
    Component() {
      return <Register />;
    },
  },
  {
    path: "/login",
    Component() {
      return <Login />;
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