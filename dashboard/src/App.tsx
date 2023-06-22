import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import "./index.css";

let router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello you use CQA dashboard!s!" }),
    Component() {
      let data = useLoaderData() as { message: string };
      return <div className="murza">{data.message}</div>;
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}