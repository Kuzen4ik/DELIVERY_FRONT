import { useContext, useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";

import { GlobalContext } from "../../context/GlobalContext";
import { postMenuAPI } from "../../api/api";
import Modal from "../Modal";

const AddFoodInMenu = ({ onClose, setIsUpdateMenu }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [valueFood, setValueFood] = useState({ name: "", price: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const { shops, shoppingCart } = useContext(GlobalContext);

  const shopName = useMemo(() => {
    if (!shops) return "not";
    const shop = shops.find(({ id }) => id === shoppingCart?.shopId);
    return shop.name;
  }, [shoppingCart, shops]);

  const onChangeHandler = (event, key) => {
    setValueFood((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const onSubmitHandler = async () => {
    setDisabled(true);
    if (!selectedImage) {
      setErrorMessage("add image");
    } else if (!valueFood.name.length) {
      setErrorMessage("add name food");
    } else if (!valueFood.price.length) {
      setErrorMessage("add price food");
    } else {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("name", valueFood.name);
      formData.append("price", valueFood.price);

      try {
        await postMenuAPI(shoppingCart?.shopId, formData);
        onClose();
        setSelectedImage(null);
        setValueFood({ name: "", price: "" });
        setIsUpdateMenu((prev) => !prev);
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
      title={`Add new food in ${shopName}`}
      errorMessage={errorMessage}
      disabled={disabled}
      onSubmitHandler={onSubmitHandler}
    >
      <TextField
        value={valueFood.name}
        label="Name food"
        size="small"
        fullWidth
        onChange={(e) => onChangeHandler(e, "name")}
      />
      <TextField
        value={valueFood.price}
        label="Price"
        type="number"
        size="small"
        fullWidth
        onChange={(e) => onChangeHandler(e, "price")}
      />
      <TextField
        type="file"
        size="small"
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
    </Modal>
  );
};

export default AddFoodInMenu;
