import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";

import AuthLayout from "../../components/auth-layout";
import AuthSuccess from "../../components/auth-success";
import { useAuthAPI } from "../../hooks/useAuthAPI";
import { capitalizeFirstLetter } from "../../helpers";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const { login, loading, error } = useAuthAPI();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("error", error);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
      .then(() => {
        setSuccess(true);

        // redirect to originating page with the token
        setTimeout(() => {
          window.location.href = `/`;
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      });
  };

  if (success)
    return <AuthSuccess text="Redirecting..." title="Authenticated!" />;

  return (
    <AuthLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: { xs: "#F0F4FF", sm: "#F0F4FF", md: "#fff" },
          m: 0,
          p: { xs: 2, sm: 2, md: 4 },
          height: "100%",
          borderTopRightRadius: "0.3rem",
          borderBottomRightRadius: "0.3rem",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "600",
            fontSize: "1.5rem",
            fontFamily: "Barlow",
            my: 3,
          }}
        >
          Sign In Into Your Account
        </Typography>
        {error && (
          <Typography
            variant="h2"
            sx={{
              fontWeight: "600",
              fontSize: "1.5rem",
              fontFamily: "Barlow",
              textAlign: "center",
              color: "danger.main",
            }}
          >
            {capitalizeFirstLetter(error?.response.data.error)}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            required
            sx={{ mb: 3 }}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="example@gmail.com"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="email icon" edge="end">
                    <Email />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            label="Password"
            required
            fullWidth
            placeholder="Enter password"
            sx={{ mb: 3 }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Checkbox defaultChecked size="small" label="remember me" />
              <Typography
                color="secondary.main"
                variant="body2"
                sx={{ fontSize: "0.9rem" }}
              >
                Remember me
              </Typography>
            </Box>
            <Link to="/password-reset-request">
              <Button
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Forgot password?
              </Button>
            </Link>
          </Box>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            disableElevation
            sx={{
              textTransform: "capitalize",
              fontSize: "1rem",
              my: 2,
              py: 1.5,
            }}
            variant="contained"
          >
            {"Sign in"}
          </LoadingButton>
        </form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            color="secondary.main"
            variant="body2"
            sx={{ fontSize: "13px" }}
          ></Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
