import { useCallback, useContext, useState } from "react";
import { Button } from "@mui/material";

import Modal from "../Modal";
import TextFieldUI from "../UI/TextFieldUI";
import { validateEmail } from "../../utils/helpers";
import { AuthContext } from "../../context/JWTContext";

const SignIn = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [valueForm, setValueForm] = useState({ email: "", password: "" });

  const { signIn } = useContext(AuthContext);

  const onSubmitHandler = useCallback(async () => {
    if (!validateEmail(valueForm.email)) {
      return;
    }
    try {
      await signIn(valueForm);
      setValueForm({ email: "", password: "" });
      setIsShowModal(false);
    } catch (err) {
      console.log(err);
    }
  }, [valueForm]);

  const onChangeHandler = (value, key) => {
    setValueForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
      >
        Sign in
      </Button>
      {isShowModal && (
        <Modal
          title="Sign in"
          onClose={() => setIsShowModal(false)}
          onSubmitHandler={onSubmitHandler}
          btnText="Sign in"
        >
          <TextFieldUI
            value={valueForm.email}
            type="email"
            label="Email"
            onChange={(value) => onChangeHandler(value, "email")}
          />
          <TextFieldUI
            value={valueForm.password}
            type="password"
            label="Password"
            onChange={(value) => onChangeHandler(value, "password")}
          />
        </Modal>
      )}
    </>
  );
};

export default SignIn;
