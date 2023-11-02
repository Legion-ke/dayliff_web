/* eslint-disable react/prop-types */
import { Box, Container, Grid, Typography } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
            sx={{
              m: 0,
              p: { xs: 2, sm: 2, md: 4 },
              background: {
                xs: "#F0F4FF",
                sm: "#F0F4FF",
                md: "rgba(45, 149, 125, 0.20)",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              borderTopLeftRadius: "0.3rem",
              borderBottomLeftRadius: "0.3rem",
            }}
          >
            <img
              className="auth-logo"
              src="/davis.png"
              style={{ width: "600", height: "auto", margin: "0 auto" }}
            />
            <Box
              sx={{
                my: 2,
                display: { xs: "none", sm: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  fontFamily: "Barlow",
                }}
              >
                Davis & Shirtliff
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mx: { xs: 2, sm: 2, md: 3 },
                  my: 2,
                  fontSize: "1.2rem",
                  lineHeight: "1.8rem",
                  fontFamily: "Barlow",
                  color: "secondary.main",
                }}
              >
                Know H2O through experience.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthLayout;
