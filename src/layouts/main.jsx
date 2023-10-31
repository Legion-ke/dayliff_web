import { Route, Routes } from "react-router-dom";
import Sidebar from "../common/sideNav";
import PageContent from "../common/content";
import Dashboard from "../pages/Dashboard";
import { getMenuItems } from "./menus";
import Managements from "../pages/management";
import OrderManagement from "../pages/Orders";

export default function MainPage() {
  return (
    <>
      <Sidebar menus={getMenuItems()} />
      <PageContent>
        <Routes>
          <Route path="*" element={<Dashboard />} />
          <Route path="management/*" element={<Managements />} />
          <Route path="orders/*" element={<OrderManagement />} />
        </Routes>
      </PageContent>
    </>
  );
}
