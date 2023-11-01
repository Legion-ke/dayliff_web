/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import {
  SideNav,
  SideNavBody,
  SideNavGroup,
  SideNavGroupBody,
  SideNavGroupHeader,
  SideNavHeader,
} from "./styled";
import { Box } from "@mui/material";
import React from "react";
import davisLogo from "../assets/davis.png";

const Sidebar = ({ menus }) => {
  const navigate = useNavigate();
  return (
    <SideNav>
      <SideNavHeader onClick={() => navigate("/")}>
        <img
          src={davisLogo}
          alt="logo"
          style={{
            width: "150px",
            height: "auto",
            // margin: "0 auto",
          }}
        />
      </SideNavHeader>
      <SideNavBody>
        {menus.map((group, index) => (
          <Group key={index} {...group} />
        ))}
      </SideNavBody>
    </SideNav>
  );
};

const Group = (props) => {
  const { title, items, expanded = true, expandable = true } = props;
  const [open, setOpen] = React.useState(expanded);

  const toggle = () => setOpen(!open);

  return (
    <SideNavGroup>
      <SideNavGroupHeader
        onClick={expandable ? toggle : null}
        style={{
          display: title ? "flex" : "none",
        }}
      >
        <span>{title}</span>
        {expandable && (
          <i className={`bx bx-chevron-${open ? "up" : "down"}`} />
        )}
      </SideNavGroupHeader>
      <SideNavGroupBody className={open ? "open" : ""}>
        {items.map((item, index) => {
          if (item.href) {
            return <MenuLink key={index} {...item} href={item.href} />;
          }
          return <MenuButton key={index} {...item} />;
        })}
      </SideNavGroupBody>
    </SideNavGroup>
  );
};

const MenuLink = ({ href, icon, title, exact }) => {
  return (
    <NavLink className="item" to={href} end={!!exact}>
      {icon}
      <span>{title}</span>
    </NavLink>
  );
};

const MenuButton = ({ icon, title, onClick }) => {
  return (
    <Box className="item" onClick={onClick}>
      {icon}
      <span> {title}</span>
    </Box>
  );
};

export default Sidebar;
