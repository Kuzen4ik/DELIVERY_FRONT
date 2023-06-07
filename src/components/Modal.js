import { useRef } from "react";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";
import styled from "@emotion/styled";
import { Alert, Button, IconButton } from "@mui/material";

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;

  .modalContent {
    width: 300px;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: relative;

    .modalContainer {
      display: flex;
      flex-direction: column;
      gap: 20px;

      h5 {
        margin: 0;
        text-align: center;
      }
      .iconClose {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
      }
    }
  }
`;
const Modal = ({
  children,
  onClose,
  title,
  errorMessage,
  disabled,
  onSubmitHandler,
}) => {
  const contentRef = useRef(null);

  useOutsideClickHandler(contentRef, () => onClose());

  return (
    <ModalWrapper>
      <div ref={contentRef} className="modalContent">
        <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
          <IconButton onClick={onClose} className="iconClose">
            x
          </IconButton>
          <h5>{title}</h5>
          {errorMessage && (
            <Alert mt={2} mb={3} severity="error">
              {errorMessage}
            </Alert>
          )}
          {children}
          <Button
            disabled={disabled}
            variant="contained"
            onClick={onSubmitHandler}
          >
            Add
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
