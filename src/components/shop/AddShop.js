import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { TextField } from "@mui/material";
import { postShopsAPI } from "../../api/api";
import Modal from "../Modal";

const AddShop = ({ onClose }) => {
  const [valueFood, setValueFood] = useState({
    name: "",
    address: "",
    createdBy: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const { setIsUpdateShops } = useContext(GlobalContext);

  const onChangeHandler = (event, key) => {
    setValueFood((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const onSubmitHandler = async () => {
    setDisabled(true);
    if (!valueFood.createdBy.length) {
      setErrorMessage("add email");
    } else if (!valueFood.name.length) {
      setErrorMessage("add name shop");
    } else if (!valueFood.address.length) {
      setErrorMessage("add address shop");
    } else {
      try {
        await postShopsAPI(valueFood);
        onClose();
        setValueFood({ name: "", address: "", createdBy: "" });
        setIsUpdateShops((prev) => !prev);
      } catch (err) {
        console.log(err);
        const message = "error";
        setErrorMessage(message);
      }
    }

    setDisabled(false);
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <Modal
      onClose={onClose}
      title="Add new Shop"
      errorMessage={errorMessage}
      disabled={disabled}
      onSubmitHandler={onSubmitHandler}
    >
      <TextField
        value={valueFood.createdBy}
        label="Email"
        size="small"
        type="email"
        fullWidth
        onChange={(e) => onChangeHandler(e, "createdBy")}
      />
      <TextField
        value={valueFood.name}
        label="Name food"
        size="small"
        type="text"
        fullWidth
        onChange={(e) => onChangeHandler(e, "name")}
      />
      <TextField
        value={valueFood.address}
        label="Address"
        size="small"
        type="text"
        fullWidth
        onChange={(e) => onChangeHandler(e, "address")}
      />
    </Modal>
  );
};

export default AddShop;
