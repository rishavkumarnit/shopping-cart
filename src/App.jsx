import Home from "./Components/Home";
import Cart from "./Components/Cart";
import CheckOut from "./Components/CheckOut";
import Product from "./Components/Product";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import Profile from "./Components/Profile";
import { store } from "./Components/slices/store";
import { Provider } from "react-redux";
// eslint-disable-next-line react-refresh/only-export-components
export const User = createContext();

function App() {
  const [profile, setProfile] = useState({
    userName: "Profile",
    email: "",
    address: "",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:id",
      element: <Product />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/checkout",
      element: <CheckOut />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    { path: "/checkout", element: <CheckOut /> },
  ]);

  return (
    <>
      <Provider store={store}>
        <User.Provider value={{ profile, setProfile }}>
          <RouterProvider router={router} />
        </User.Provider>
      </Provider>
    </>
  );
}

export default App;
