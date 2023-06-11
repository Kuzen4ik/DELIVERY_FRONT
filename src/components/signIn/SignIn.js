import { useCallback, useContext, useState } from "react";
import { Button, Tab } from "@mui/material";

import Modal from "../Modal";
import TextFieldUI from "../UI/TextFieldUI";
import { validateEmail } from "../../utils/helpers";
import { AuthContext } from "../../context/JWTContext";

const tabEnm = {
  signIn: 0,
  signUp: 1,
};

const SignIn = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [valueForm, setValueForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(tabEnm.signIn);

  const { signIn, signUp } = useContext(AuthContext);

  const signUpHandler = useCallback(async () => {
    if (!validateEmail(valueForm.email)) {
      return;
    }
    try {
      await signUp(valueForm);
      setValueForm({ email: "", password: "" });
      setActiveTab(tabEnm.signIn);
    } catch (err) {
      console.log(err);
      setError(err.message || err);
    }
  }, [valueForm]);

  const signInHandler = useCallback(async () => {
    if (!validateEmail(valueForm.email)) {
      return;
    }
    try {
      await signIn(valueForm);
      setValueForm({ email: "", password: "" });
      setIsShowModal(false);
    } catch (err) {
      console.log(err);
      setError(err.message || err);
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
          onClose={() => setIsShowModal(false)}
          onSubmitHandler={() => {
            if (activeTab === tabEnm.signIn) {
              signInHandler();
            } else {
              signUpHandler();
            }
          }}
          btnText={activeTab === tabEnm.signIn ? "Sign In" : "Sign Up"}
          errorMessage={error}
        >
          <div style={{ display: "flex", marginTop: 15 }}>
            <Button
              variant={activeTab === tabEnm.signIn ? "contained" : "outlined"}
              fullWidth
              onClick={() => setActiveTab(tabEnm.signIn)}
            >
              Sign In
            </Button>
            <Button
              variant={activeTab === tabEnm.signUp ? "contained" : "outlined"}
              fullWidth
              onClick={() => setActiveTab(tabEnm.signUp)}
            >
              Sign Up{" "}
            </Button>
          </div>
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
