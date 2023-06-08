import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ShopItem from "./ShopItem";
import Loader from "../Loader";
import { GlobalContext } from "../../context/GlobalContext";
import AddShop from "./AddShop";
import DeleteButton from "../UI/DeleteButton";
import { deleteShopsAPI } from "../../api/api";

const Wrapper = styled.div`
  max-width: 280px;
  width: 100%;
  border: 1.5px solid black;
  border-radius: 15px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  h2 {
    margin: 0;
    text-align: center;
  }

  .shopItems {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 0;
  }

  .addShopBtn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
  }
`;

const Shops = () => {
  const { shops, shoppingCart, setShoppingCart, setIsUpdateShops, isAdmin } =
    useContext(GlobalContext);

  const [isShowAddShopModal, setIsShowAddShopModal] = useState(false);

  const navigate = useNavigate();

  const onSelectShopHandler = (shopId) => {
    if (shoppingCart?.shopId === shopId) {
      setShoppingCart({ shopId: null, foods: [], price: 0 });
      navigate("/");
    } else {
      setShoppingCart({ shopId, foods: [], price: 0 });
    }
  };

  const deleteShop = async (shop) => {
    const res = window.confirm(`Remove ${shop.name}?`);
    if (!res) {
      return;
    }
    try {
      await deleteShopsAPI(shop.id);
      setIsUpdateShops((prev) => !prev);
    } catch (err) {
      console.log(err.message || err);
    }
  };

  return (
    <Wrapper>
      <h2>Shops:</h2>
      {!shops ? (
        <Loader />
      ) : (
        <div className="shopItems">
          {shops?.map((shop) => (
            <div key={shop.id} style={{ position: "relative" }}>
              <ShopItem
                onSelectHandler={() => onSelectShopHandler(shop.id)}
                title={shop.name}
                isActive={shop.id === shoppingCart?.shopId}
                disabled={
                  shoppingCart?.foods.length && shoppingCart?.shopId !== shop.id
                }
              />
              {isAdmin && <DeleteButton onClick={() => deleteShop(shop)} />}
            </div>
          ))}
        </div>
      )}
      {isAdmin && (
        <Button
          className="addShopBtn"
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setIsShowAddShopModal(true);
          }}
        >
          Add Shop
        </Button>
      )}
      {isShowAddShopModal && (
        <AddShop onClose={() => setIsShowAddShopModal(false)} />
      )}
    </Wrapper>
  );
};

export default Shops;
