import styled from "@emotion/styled";
import ShoppingCartForm from "../../components/shoppingCart/ShoppingCartForm";
import ShoppingCartList from "../../components/shoppingCart/ShoppingCartList";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const ShoppingCartWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;

  .list {
    width: 48%;
  }
`;

const ShoppingCart = () => {
  const { shoppingCard } = useContext(GlobalContext);

  return (
    <ShoppingCartWrapper>
      <ShoppingCartForm />
      <div className="list">
        <ShoppingCartList list={shoppingCard.foods} />
      </div>
    </ShoppingCartWrapper>
  );
};

export default ShoppingCart;
