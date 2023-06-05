import React from "react";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

const Loader = ({ size }) => (
  <Root>
    <CircularProgress color="secondary" size={size || 40} />
  </Root>
);

export default Loader;
