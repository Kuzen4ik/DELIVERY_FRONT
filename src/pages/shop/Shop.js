import styled from "@emotion/styled";
import Shops from "../../components/shop/Shops";
import ShopMenu from "../../components/shop/ShopMenu";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext, useEffect } from "react";
import { urlToObject } from "../../utils/helpers";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 20px;
`;

// const SHOPS = [
//   { id: 1, title: "Mk" },
//   { id: 2, title: "KFC" },
// ];

// const MENU = [
//   {
//     id: 101,
//     title: "test1",
//     description: "description description description description description",
//     price: 100,
//   },

//   {
//     id: 102,
//     title: "test2",
//     description: "description description description description description",
//     price: 100,
//   },

//   {
//     id: 103,
//     title: "test3",
//     description: "description description description description description",
//     price: 100,
//   },
//   {
//     id: 104,
//     title: "test4",
//     description: "description description description description description",
//     price: 100,
//   },

//   {
//     id: 105,
//     title: "test5",
//     description: "description description description description description",
//     price: 100,
//   },

//   {
//     id: 106,
//     title: "test6",
//     description: "description description description description description",
//     price: 100,
//   },
// ];

const Shop = () => {
  const { setSelectedShopId } = useContext(GlobalContext);

  useEffect(() => {
    const searchObj = urlToObject(window.location.search);
    if (searchObj.shop) {
      setSelectedShopId(Number(searchObj.shop));
    }
  }, []);

  return (
    <Wrapper>
      <Shops />
      <ShopMenu />
    </Wrapper>
  );
};

export default Shop;
