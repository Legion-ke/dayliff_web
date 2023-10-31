/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const TextView = ({
  primary,
  secondary,
  mainColor,
  captionColor,
  sx = {},
}) => {
  return (
    <Box sx={{ ...sx }}>
      <Typography
        color={mainColor || "black"}
        sx={{ fontSize: "inherit" }}
        component="div"
      >
        {primary}
      </Typography>
      <Typography
        variant="caption"
        color={captionColor || "grey"}
        component="div"
      >
        {secondary}
      </Typography>
    </Box>
  );
};

export const TextView2 = ({
  primary,
  secondary,
  mainColor,
  captionColor,
  sx = {},
}) => {
  return (
    <Box sx={{ ...sx }}>
      <Typography variant="caption" color={mainColor || "grey"} component="div">
        {primary}
      </Typography>
      <Typography
        color={captionColor || "black"}
        sx={{ fontSize: "inherit" }}
        component="div"
      >
        {secondary}
      </Typography>
    </Box>
  );
};
