import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Register } from "./views/Register";
import { PruebaAnderson } from "./views/pruebaAnderson";

const routes = createBrowserRouter([
  {
      path: "/register",
      element: <Register/>,
  },
  {
      path: "/pruebaAnderson",
      element: <PruebaAnderson/>,
  }
])

export function App() {
  return (
    <RouterProvider router={routes}/>
  );
}
