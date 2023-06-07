import styled from "@emotion/styled";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";

import ShopMenuItem from "./ShopMenuItem";
import Loader from "../Loader";
import { GlobalContext } from "../../context/GlobalContext";
import { deleteMenuAPI, getMenuByShopIdAPI } from "../../api/api";
import AddFoodInMenu from "./AddFoodInMenu";
import DeleteButton from "../UI/DeleteButton";

const ShopMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1.5px solid black;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;

  .shopMenuItems {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .addFoodBtn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
  }
`;

const ShopMenu = () => {
  const [menuItems, setMenuItems] = useState(null);
  const [isShowAddFoodModal, setIsShowAddFoodModal] = useState(false);
  const [isUpdateMenu, setIsUpdateMenu] = useState(false);

  const { shoppingCart, setShoppingCart, isAdmin } = useContext(GlobalContext);

  const addFoodToCart = (item) => {
    const foodCopy = { ...item };
    delete foodCopy.createdAt;
    const shoppingCartFoodsCopy = [...shoppingCart.foods];
    const idx = shoppingCartFoodsCopy.findIndex(
      (selectedFood) => selectedFood.id === item.id
    );
    if (idx > -1) {
      shoppingCartFoodsCopy[idx].count += 1;
    } else {
      shoppingCartFoodsCopy.push({
        ...foodCopy,
        count: 1,
      });
    }
    setShoppingCart((prev) => ({
      ...prev,
      foods: [...shoppingCartFoodsCopy],
      price: (shoppingCart.price += item.price),
    }));
  };

  const getShopMenu = useCallback(async () => {
    setMenuItems(null);
    try {
      const { data } = await getMenuByShopIdAPI(shoppingCart.shopId);
      setMenuItems(data);
    } catch (err) {
      console.log(err);
    }
  }, [shoppingCart]);

  useEffect(() => {
    if (shoppingCart.shopId) {
      getShopMenu();
    }
  }, [shoppingCart, isUpdateMenu]);

  const deleteMenu = async (item) => {
    const res = window.confirm(`Remove ${item.name}?`);
    if (!res) {
      return;
    }
    try {
      await deleteMenuAPI(item.id);
      setIsUpdateMenu((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const content = useMemo(() => {
    let content;
    if (shoppingCart.shopId && !menuItems) {
      content = <Loader />;
    } else if (!shoppingCart.shopId) {
      content = <h3>Choose a store</h3>;
    } else if (menuItems) {
      content = (
        <>
          <div className="shopMenuItems">
            {menuItems.map((item) => (
              <div style={{ position: "relative" }} key={item.id}>
                <ShopMenuItem
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  onSelectHandler={() => addFoodToCart(item)}
                  image={item.image}
                />
                {isAdmin && <DeleteButton onClick={() => deleteMenu(item)} />}
              </div>
            ))}
          </div>
          {isAdmin && (
            <Button
              className="addFoodBtn"
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setIsShowAddFoodModal(true);
              }}
            >
              Add food in menu
            </Button>
          )}
        </>
      );
    }
    return content;
  }, [shoppingCart, menuItems, shoppingCart, isAdmin]);

  return (
    <ShopMenuWrapper>
      {content}
      {isShowAddFoodModal && (
        <AddFoodInMenu
          onClose={() => setIsShowAddFoodModal(false)}
          setIsUpdateMenu={setIsUpdateMenu}
        />
      )}
    </ShopMenuWrapper>
  );
};

export default ShopMenu;
