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
  const { shoppingCart, setShoppingCart } = useContext(GlobalContext);

  const removeFoodFromCart = (food) => {
    let shoppingCartFoodsCopy = [...shoppingCart.foods];
    if (food.count === 1) {
      shoppingCartFoodsCopy = shoppingCart.foods.filter(
        ({ id }) => food.id !== id
      );
    } else {
      const idx = shoppingCartFoodsCopy.findIndex(({ id }) => id === food.id);
      shoppingCartFoodsCopy[idx].count -= 1;
    }

    setShoppingCart({
      foods: [...shoppingCartFoodsCopy],
      price: shoppingCart.price - food.price,
    });
  };

  const addFoodFromCart = (food) => {
    const shoppingCartFoodsCopy = [...shoppingCart.foods];
    const idx = shoppingCartFoodsCopy.findIndex(({ id }) => id === food.id);
    shoppingCartFoodsCopy[idx].count += 1;
    setShoppingCart({
      foods: [...shoppingCartFoodsCopy],
      price: shoppingCart.price + food.price,
    });
  };

  return (
    <ShoppingCartListWrapper>
      <div className="cartList">
        {shoppingCart.foods?.map((item) => (
          <ShoppingCartItem
            key={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
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
