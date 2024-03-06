import * as React from "react";
import Button from "@mui/material/Button";

export default function ButtonUsage({ children, onClickHandler }) {
  return (
    <Button variant="contained" onClick={onClickHandler}>
      {children}
    </Button>
  );
}
