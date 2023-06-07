import styled from "@emotion/styled";
import { Button } from "@mui/material";

import ShoppingCartForm from "../../components/shoppingCart/ShoppingCartForm";
import ShoppingCartList from "../../components/shoppingCart/ShoppingCartList";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { deleteCouponsAPI, getCouponsAPI, postOrdersAPI } from "../../api/api";

const ShoppingCartWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;

  .list {
    width: 48%;

    .addCoupon {
      margin-top: 30px;
    }

    .submit {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      button {
        max-width: 150px;
        width: 100%;
        height: 40px;
      }
    }
  }
`;

const ShoppingCart = () => {
  const [disabled, setDisabled] = useState(true);
  const [valueForm, setValueForm] = useState({
    address: "",
    userEmail: "",
    phone: "",
    name: "",
  });

  const [coupon, setCoupon] = useState({
    code: "",
    decryption: "",
    discount: null,
    status: false,
  });
  const { shoppingCart, setShoppingCart, setIsUpdateCoupons } =
    useContext(GlobalContext);

  const checkCoupon = async () => {
    if (!coupon.code.length) {
      return;
    }

    try {
      const { data } = await getCouponsAPI(coupon.code);
      setCoupon((prev) => ({
        ...prev,
        decryption: `Success -${data.discount}%`,
        status: true,
        discount: data.discount,
      }));
      console.log(data);
    } catch (err) {
      console.log(err);
      setCoupon((prev) => ({
        ...prev,
        decryption: `Not found`,
        status: false,
      }));
    }
  };

  useEffect(() => {
    let disabledCheck = false;
    Object.keys(valueForm).forEach((key) => {
      if (!valueForm[key].length) {
        disabledCheck = true;
      }
    });

    if (!shoppingCart?.foods.length) {
      disabledCheck = true;
    }

    setDisabled(disabledCheck);
  }, [valueForm, shoppingCart]);

  const totalPrice = useMemo(() => {
    if (coupon.status) {
      return (
        shoppingCart.price -
        (shoppingCart.price / 100) * Number(coupon.discount)
      );
    }
    return shoppingCart.price;
  }, [coupon, shoppingCart]);

  const postOrders = async () => {
    const sendData = {
      ...valueForm,
      items: [...shoppingCart?.foods],
      price: coupon.status ? totalPrice : shoppingCart?.price,
      shopId: shoppingCart?.shopId,
    };

    try {
      await deleteCouponsAPI(coupon.code);
      await postOrdersAPI(sendData);
      setShoppingCart({
        shopId: null,
        foods: [],
        price: 0,
      });
      setIsUpdateCoupons((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ShoppingCartWrapper>
      <ShoppingCartForm value={valueForm} setValue={setValueForm} />
      <div className="list">
        <ShoppingCartList list={shoppingCart.foods} />
        <div className="addCoupon">
          <input
            value={coupon.code}
            type="password"
            onChange={(e) =>
              setCoupon((prev) => ({ ...prev, code: e.target.value }))
            }
            disabled={coupon.status}
          />
          <button onClick={checkCoupon} type="button" disabled={coupon.status}>
            Check coupon
          </button>
          {coupon.decryption?.length ? (
            <div>
              <h5>{coupon.decryption}</h5>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="submit">
          <div>
            <h4>Price: {shoppingCart.price}</h4>
            <h2>Total price: {totalPrice}</h2>
          </div>
          <Button
            disabled={disabled}
            type="button"
            variant="contained"
            onClick={postOrders}
          >
            Submit
          </Button>
        </div>
      </div>
    </ShoppingCartWrapper>
  );
};

export default ShoppingCart;
