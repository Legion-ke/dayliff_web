import { Route, Routes } from "react-router-dom";
import Login from "./login";
import { Box } from "@mui/material";

export default function Auth() {
  return (
    <>
      <Box sx={{ pt: 5 }}>
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Box>
    </>
  );
}
