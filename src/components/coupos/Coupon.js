import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";

const CouponWrapper = styled.div`
  width: 200px;
  height: 120px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .discount {
    width: 100%;
    height: 85px;
    background: yellowgreen;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      margin: 0;
      color: blue;
      font-size: 40px;
    }
  }
`;

const Coupon = ({ code, discount }) => {
  const [disabled, setDisabled] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
  };

  return (
    <CouponWrapper>
      <div className="discount">
        <p>{discount}%</p>
      </div>
      <Button
        variant="contained"
        size="small"
        color="inherit"
        disabled={disabled}
        onClick={handleCopyCode}
      >
        Copy code
      </Button>
    </CouponWrapper>
  );
};

export default Coupon;
