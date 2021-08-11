import styled from "styled-components";

import { TextField } from "@material-ui/core";

export const Field = styled(TextField)`
  transition: background-color 0.2s;
  background-color: ${(props) =>
    props.disabled ? "rgba(133, 133, 133, 0.16)" : "white"};
`;
