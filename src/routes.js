import Coupons from "./pages/coupons/Coupons";
import History from "./pages/histopy/History";
import Shop from "./pages/shop/Shop";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";

const routes = [
  {
    path: "/",
    element: <Shop />,
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  {
    path: "/history",
    element: <History />,
  },

  {
    path: "/coupons",
    element: <Coupons />,
  },
];

export default routes;
