import styled from "@emotion/styled";
import ShopItem from "./ShopItem";
import Loader from "../Loader";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getShopsAPI } from "../../api/api";

const Wrapper = styled.div`
  max-width: 280px;
  width: 100%;
  border: 1.5px solid black;
  border-radius: 15px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

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
`;

const Shops = () => {
  const [shops, setShops] = useState(null);
  const { selectedShopId, setSelectedShopId } = useContext(GlobalContext);

  const navigate = useNavigate();

  const onSelectShopHandler = (shopId) => {
    if (selectedShopId === shopId) {
      setSelectedShopId(null);
      navigate("/");
    } else {
      setSelectedShopId(shopId);
      navigate(`/?shop=${shopId}`);
    }
  };

  useEffect(() => {
    const getShops = async () => {
      try {
        const data = await getShopsAPI();
        setShops(data);
      } catch (err) {
        console.log(err);
      }
    };
    getShops();
  }, []);

  return (
    <Wrapper>
      <h2>Shops:</h2>
      {!shops ? (
        <Loader />
      ) : (
        <div className="shopItems">
          {shops.map((shop) => (
            <ShopItem
              key={shop.id}
              onSelectHandler={() => onSelectShopHandler(shop.id)}
              title={shop.title}
              isActive={shop.id === selectedShopId}
              // disabled={selectedShopId && shop.id !== selectedShopId}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Shops;
