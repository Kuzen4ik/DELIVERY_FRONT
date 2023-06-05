import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useState } from "react";

const Wrapper = styled.div`
  max-width: 48%;
  width: 100%;
  height: 100%;
  border: 1.5px solid black;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ShoppingCartForm = () => {
  const [value, setValue] = useState({
    address: "",
    email: "",
    phone: "",
    name: "",
  });

  const onChangeHandler = (event, key) => {
    setValue((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <Wrapper>
      <TextField
        label="Address"
        placeholder="Address"
        type="text"
        fullWidth
        value={value.address}
        onChange={(e) => onChangeHandler(e, "address")}
      />
      <TextField
        label="Email"
        placeholder="Email"
        type="email"
        fullWidth
        value={value.email}
        onChange={(e) => onChangeHandler(e, "email")}
      />

      <TextField
        label="Phone"
        placeholder="Phone"
        type="tel"
        fullWidth
        value={value.phone}
        onChange={(e) => onChangeHandler(e, "phone")}
      />
      <TextField
        label="Name"
        placeholder="Name"
        type="text"
        fullWidth
        value={value.address}
        onChange={(e) => onChangeHandler(e, "name")}
      />
    </Wrapper>
  );
};

export default ShoppingCartForm;
