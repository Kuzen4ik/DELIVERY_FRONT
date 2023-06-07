import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const HistoryFormWrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 1.5px solid black;
  border-radius: 15px;
  box-sizing: border-box;

  .historyFormContainer {
    margin: 0 auto;
    max-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
`;

const HistoryForm = ({ value, setValue, onSubmitHandler }) => {
  const { isAdmin } = useContext(GlobalContext);

  const onChangeHandler = (event, key) => {
    setValue((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const disabled = useMemo(() => {
    if (isAdmin) {
      return false;
    }
    if (!value.email.length) {
      return true;
    }

    if (!value.phone.length) {
      return true;
    }

    return false;
  }, [isAdmin, value]);

  return (
    <HistoryFormWrapper>
      <div className="historyFormContainer">
        <TextField
          label="Email"
          fullWidth
          size="small"
          value={value.email}
          onChange={(e) => onChangeHandler(e, "email")}
        />
        <TextField
          label="Phone"
          fullWidth
          size="small"
          value={value.phone}
          onChange={(e) => onChangeHandler(e, "phone")}
        />
        <Button
          variant="contained"
          type="button"
          onClick={onSubmitHandler}
          disabled={disabled}
        >
          Find Orders
        </Button>
      </div>
    </HistoryFormWrapper>
  );
};

export default HistoryForm;
