import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Menu, menuLoader } from "./features/menu/Menu";
import CreateOrder, { action as createOrderAction } from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import { orderLoader } from "./features/order/SearchOrder";
import { AppLayout } from "./ui/AppLayout";
import NotFound from "./ui/Error";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <NotFound />,
      },
      {
        path: "/cart", element: <Cart />
      },
      {
        path: "/order/new", element: <CreateOrder />, action: createOrderAction
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <NotFound />,
        action: updateOrderAction,
      },
      // { path: "*", element: <h1>Empty</h1> },
    ]
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;