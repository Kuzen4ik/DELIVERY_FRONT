import styled from "@emotion/styled";
import ShoppingCartItem from "./ShoppingCartItem";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

const ShoppingCartListWrapper = styled.div`
  width: 100%;
  height: 65%;
  border: 1.5px solid black;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 20px;
  overflow: auto;

  .cartList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ShoppingCartList = () => {
  const { shoppingCard, setShoppingCard } = useContext(GlobalContext);

  const removeFoodFromCart = (food) => {
    let shoppingCardFoodsCopy = [...shoppingCard.foods];
    if (food.count === 1) {
      shoppingCardFoodsCopy = shoppingCard.foods.filter(
        ({ id }) => food.id !== id
      );
    } else {
      const idx = shoppingCardFoodsCopy.findIndex(({ id }) => id === food.id);
      shoppingCardFoodsCopy[idx].count -= 1;
    }

    setShoppingCard({
      foods: [...shoppingCardFoodsCopy],
      price: shoppingCard.price - food.price,
    });
  };

  const addFoodFromCart = (food) => {
    const shoppingCardFoodsCopy = [...shoppingCard.foods];
    const idx = shoppingCardFoodsCopy.findIndex(({ id }) => id === food.id);
    shoppingCardFoodsCopy[idx].count += 1;
    setShoppingCard({
      foods: [...shoppingCardFoodsCopy],
      price: shoppingCard.price + food.price,
    });
  };
  return (
    <ShoppingCartListWrapper>
      <div className="cartList">
        {shoppingCard.foods.map((item) => (
          <ShoppingCartItem
            key={item.id}
            title={item.title}
            price={item.price}
            count={item.count}
            addHandler={() => addFoodFromCart(item)}
            removeHandler={() => removeFoodFromCart(item)}
          />
        ))}
      </div>
    </ShoppingCartListWrapper>
  );
};

export default ShoppingCartList;
