import styled from "@emotion/styled";
import Shops from "../../components/shop/Shops";
import ShopMenu from "../../components/shop/ShopMenu";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 20px;
`;

const Shop = () => {
  return (
    <Wrapper>
      <Shops />
      <ShopMenu />
    </Wrapper>
  );
};

export default Shop;
