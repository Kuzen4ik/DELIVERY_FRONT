import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import Loader from "../Loader";

const ShopMenuItemWrapper = styled.div`
  max-width: 280px;
  min-width: 200px;
  width: 100%;
  height: 200px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;

  .image {
    width: 100%;
    height: 110px;
    background: yellowgreen;
    border-radius: 10px;
    cursor: pointer;
  }

  h5 {
    margin: 10px 0 0 5px;
  }

  .btnAddToCart {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
    }

    button {
      border-radius: 10px;
      border: none;
      background: silver;
      padding: 5px 10px;
      cursor: pointer;
      width: 89px;
      height: 30px;
    }

    .disabled {
      cursor: default;
    }
  }
`;

const ShopMenuItem = ({ title, description, onSelectHandler, price }) => {
  const [disabled, setDisabled] = useState(false);

  const onClickAddHandler = () => {
    setDisabled(true);

    onSelectHandler();
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  return (
    <ShopMenuItemWrapper>
      <Tooltip title={description}>
        <div className="image"></div>
      </Tooltip>
      <h5>{title}</h5>
      <div className="btnAddToCart">
        <p>price: {price}</p>
        <Tooltip title="The item should be added in the Shopping Cart">
          <button
            className={disabled ? "disabled" : ""}
            type="button"
            disabled={disabled}
            onClick={onClickAddHandler}
          >
            {disabled ? <Loader size={20} /> : "Add to Cart"}
          </button>
        </Tooltip>
      </div>
    </ShopMenuItemWrapper>
  );
};

export default ShopMenuItem;
