/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";

export const photo = {
  url: "",
  image: null,
  isNew: false,
};

export const UserAvatar = (props) => {
  const { src, alt } = props;

  return <Avatar className="user-thumbnail" src={src} alt={alt} />;
};
