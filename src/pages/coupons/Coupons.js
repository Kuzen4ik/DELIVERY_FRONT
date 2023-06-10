import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { deleteCouponsAPI, getCouponsAPI } from "../../api/api";
import CreateCoupon from "../../components/coupos/CreateCoupon";
import { GlobalContext } from "../../context/GlobalContext";
import Coupon from "../../components/coupos/Coupon";
import DeleteButton from "../../components/UI/DeleteButton";
import { AuthContext } from "../../context/JWTContext";

const CouponsWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1.5px solid black;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  .createCoupon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
  }
`;

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const { isUpdateCoupons, setIsUpdateCoupons } = useContext(GlobalContext);
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const { data } = await getCouponsAPI();
        setCoupons(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCoupons();
  }, [isUpdateCoupons]);

  const deleteMenu = async (coupon) => {
    const res = window.confirm(`Remove coupon -${coupon.discount}% ?`);
    if (!res) {
      return;
    }
    try {
      await deleteCouponsAPI(coupon.code);
      setIsUpdateCoupons((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CouponsWrapper>
      {Array.isArray(coupons) &&
        coupons?.map((coupon) => (
          <div key={coupon.id} style={{ position: "relative" }}>
            <Coupon code={coupon.code} discount={coupon.discount} />
            {isAdmin && <DeleteButton onClick={() => deleteMenu(coupon)} />}
          </div>
        ))}
      {isAdmin && (
        <Button
          className="createCoupon"
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            setIsShowModal(true);
          }}
        >
          Create coupon
        </Button>
      )}
      {isShowModal && <CreateCoupon onClose={() => setIsShowModal(false)} />}
    </CouponsWrapper>
  );
};

export default Coupons;
