import { TextField } from "@mui/material";
import Modal from "../Modal";
import { useContext, useState } from "react";
import { postCouponsAPI } from "../../api/api";
import { GlobalContext } from "../../context/GlobalContext";

const CreateCoupon = ({ onClose }) => {
  const [valueForm, setValueForm] = useState({
    code: Date.now(),
    discount: "",
  });
  const [error, setError] = useState(null);

  const { setIsUpdateCoupons } = useContext(GlobalContext);

  const postCoupon = async () => {
    if (!valueForm.discount.length) {
      return;
    }
    if (Number(valueForm.discount) > 99) {
      return;
    }
    try {
      await postCouponsAPI(valueForm);
      onClose();
      setIsUpdateCoupons((prev) => !prev);
    } catch (err) {
      console.log(err.massage || err);
      setError(err.massage || err);
    }
  };

  return (
    <Modal
      title="Create coupon"
      onClose={onClose}
      onSubmitHandler={postCoupon}
      errorMessage={error}
    >
      <TextField
        value={valueForm.code}
        disabled
        fullWidth
        size="small"
        label="Code"
      />
      <TextField
        value={valueForm.discount}
        onChange={(e) =>
          setValueForm((prev) => ({ ...prev, discount: e.target.value }))
        }
        type="number"
        fullWidth
        size="small"
        label="Discount %"
      />
    </Modal>
  );
};

export default CreateCoupon;
