import { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [shoppingCard, setShoppingCard] = useState({ foods: [], price: 0 });

  const globalContextValue = useMemo(
    () => ({
      shoppingCard,
      setShoppingCard,
      selectedShopId,
      setSelectedShopId,
    }),
    [shoppingCard, selectedShopId]
  );

  console.log(shoppingCard);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
