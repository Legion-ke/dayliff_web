/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        pb: 4,
        alignItems: "center",
        background: {
          xs: "#F0F4FF",
          sm: "#F0F4FF",
          md: "linear-gradient(90deg, #D4D6DA 0%, #D0FFF4 97.56%)",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
