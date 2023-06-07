import { createContext, useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import { getShopsAPI } from "../api/api";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [shops, setShops] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUpdateShops, setIsUpdateShops] = useState(false);
  const [isUpdateCoupons, setIsUpdateCoupons] = useState(false);

  const [shoppingCart, setShoppingCart] = useState(null);

  useEffect(() => {
    if (shoppingCart) {
      window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  }, [shoppingCart]);

  useEffect(() => {
    const localShoppingCart = window.localStorage.getItem("shoppingCart");
    setShoppingCart(
      localShoppingCart
        ? JSON.parse(localShoppingCart)
        : {
            shopId: null,
            foods: [],
            price: 0,
          }
    );
  }, []);

  useEffect(() => {
    const getShops = async () => {
      try {
        const { data } = await getShopsAPI();
        setShops(data);
      } catch (err) {
        console.log(err);
      }
    };
    getShops();
  }, [isUpdateShops]);

  const globalContextValue = useMemo(
    () => ({
      shoppingCart,
      setShoppingCart,
      shops,
      setShops,
      isUpdateShops,
      setIsUpdateShops,
      isUpdateCoupons,
      setIsUpdateCoupons,
      isAdmin,
      setIsAdmin,
    }),
    [shoppingCart, shops, isUpdateShops, isUpdateCoupons, isAdmin]
  );

  if (!shoppingCart) {
    return <Loader />;
  }

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
