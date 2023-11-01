/* eslint-disable react-refresh/only-export-components */
import styled from "@emotion/styled";
import { Box, Fab } from "@mui/material";

export const SideNav = styled(Box)`
  position: fixed;
  top: 0;
  width: 250px;
  height: calc(100vh);
  border-top: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  background-color: #ffffff;
`;

export const SideNavHeader = styled(Box)`
  width: 250px;
  height: 60px;
  font-size: 1.5rem;
  display: flex;
  font-weight: 600;
  align-items: center;
  padding-left: 30px;
  color: #6c63ff;
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
`;

export const SideNavBody = styled(Box)`
  width: 250px;
  height: calc(100vh - 60px);
  overflow-y: auto;
`;

export const SideNavGroup = styled(Box)`
  width: 100%;
  height: auto;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e2e2e2;
`;

export const SideNavGroupHeader = styled(Box)`
  font-size: 0.8rem;
  padding: 5px 30px;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  i {
    font-size: 1rem;
  }
`;

export const SideNavGroupBody = styled(Box)`
  width: 100%;
  max-height: 0;
  padding: 0;
  overflow-y: hidden;
  transition: max-height 1s ease-in-out;
  transition: padding 0.5s ease-in-out;
  &.open {
    max-height: 500px;
    padding: 10px 0;
  }
  .item {
    width: 80%;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 20px 10px;
    margin: 0 auto;
    font-size: 0.85rem;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none !important;
    color: inherit !important;
    &:hover {
      background-color: #6c63ff42;
    }
    &.active {
      background-color: #0082d6;
      color: #ffffff !important;
    }
    i {
      margin-right: 20px;
    }
  }
`;

export const PageBody = styled(Box)`
  position: fixed;
  width: calc(100% - 250px);
  margin-left: 250px;
  top: 0;
  overflow-y: auto;
  border-top: 1px solid #e0e0e0;
`;

export const PageBodyHeader = styled(Box)`
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  padding-left: 30px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  & a {
    color: inherit;
    text-decoration: none;
  }
`;

export const PageBodyContent = styled(Box)`
  padding: 30px;
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
`;

export const SmoothBox = styled(Box)`
  position: relative;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 2px 10px 4px #4e4e4e21;
  overflow: hidden;
`;

export const FAB = styled(Fab)`
  position: absolute;
  bottom: 1.5rem;
  right: 1rem;
  z-index: 0;
`;
