import styled from "@emotion/styled";

const ShoppingCartItemWrapper = styled.div`
  max-width: 350px;
  width: 100%;
  height: 130px;
  display: flex;
  box-sizing: border-box;
  padding: 15px;
  align-items: center;
  gap: 30px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;

  .image {
    width: 55%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  h5 {
    margin: 0;
    text-align: center;
  }

  p {
    margin: 10px;
  }

  .count {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    h3 {
      margin: 0;
    }

    button {
      text-decoration: none;
      border: 1px solid black;
      width: 30px;
      height: 30px;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

const ShoppingCartItem = ({
  name,
  price,
  count,
  addHandler,
  removeHandler,
  image,
}) => (
  <ShoppingCartItemWrapper>
    <div className="image">
      <img
        width="auto"
        height="100%"
        src={`${process.env.REACT_APP_API_URL}/${image}`}
      />
    </div>
    <div>
      <h5>{name}</h5>
      <p>price: {price}</p>
      <div className="count">
        <button type="button" onClick={addHandler}>
          +
        </button>
        <h3>{count}</h3>
        <button type="button" onClick={removeHandler}>
          -
        </button>
      </div>
    </div>
  </ShoppingCartItemWrapper>
);

export default ShoppingCartItem;
