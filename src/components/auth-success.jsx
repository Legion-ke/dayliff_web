/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const AuthSuccess = ({
  title = "Authenticated!",
  text = "Redirecting ...",
  url,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      setTimeout(() => {
        navigate(url);
      }, 5000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
            sx={{
              m: 0,
              p: { xs: 2, sm: 2, md: 4 },
              background: {
                xs: "white",
                sm: "white",
                md: "rgba(45, 149, 125, 0.20)",
              },
              display: { xs: "none", sm: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              borderTopLeftRadius: "0.3rem",
              borderBottomLeftRadius: "0.3rem",
            }}
          >
            <img className="auth-logo" src="/davis.png" />
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
                  fontSize: "1rem",
                  lineHeight: "1.6rem",
                  fontFamily: "Barlow",
                  color: "secondary.main",
                }}
              >
                Know h2O through exprerience.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "#fff",
              m: 0,
              p: { xs: 2, sm: 2, md: 4 },
              height: "100%",
            }}
          >
            <CheckCircle
              sx={{
                color: "success.dark",
                fontSize: "8rem",
              }}
            />

            <Typography
              variant="h3"
              sx={{
                color: "success.dark",
                my: 2,
                fontSize: "1.5rem",
                fontWeight: "600",
                fontFamily: "Barlow",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                fontWeight: 400,
                fontFamily: "Barlow",
              }}
            >
              {text}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthSuccess;
