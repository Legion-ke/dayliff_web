import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { CButton, Form, LButton, useAlerts } from "ochom-react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../app/utils";
import { useAuthAPI } from "../../hooks/useAuthAPI";
import { CheckCircle } from "@mui/icons-material";

const initialFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const navigateTo = useNavigate();
  const { alertError } = useAlerts();
  const { field, formData } = useForm(initialFormData);
  const [success, setSuccess] = useState(false);
  const { login, loading } = useAuthAPI();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/vendors";
        }, 3000);
      })
      .catch((err) => {
        alertError(err.response.data.message);
      });
  };

  const fields = [
    {
      type: "email",
      ...field("email", "Email"),
    },
    {
      type: "password",
      ...field("password", "Password"),
    },
    {
      type: "custom",
      component: (
        <Stack direction="column" spacing={1}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <CButton
              variant="text"
              type="button"
              onClick={() => navigateTo("#")}
            >
              Forgot password?
            </CButton>
          </Box>
          <LButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
          >
            Login
          </LButton>
        </Stack>
      ),
    },
  ];

  if (success)
    return (
      <Box className="redirect-card">
        <Card sx={{ p: 5, justifyContent: "center" }}>
          <Typography textAlign="center">
            <CheckCircle sx={{ fontSize: "4em", mx: "auto" }} color="primary" />
          </Typography>
          <Typography variant="body2" textAlign="center">
            Authenticated, redirecting...
          </Typography>
        </Card>
      </Box>
    );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={5} lg={3}>
        <Card sx={{ p: 5 }} elevation={1}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="/davis.png"
              alt="logo"
              style={{
                width: "150px",
                height: "auto",
                margin: "0 auto",
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ ml: 1 }}
              textAlign="center"
            >
              Admin Login
            </Typography>
          </Box>
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            showButtons={false}
            fieldSpacing={3}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
