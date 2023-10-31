import { Route, Routes } from "react-router-dom";
import Orders from "./orders";

export default function OrderManagement() {
  return (
    <Routes>
      <Route index element={<Orders />} />
    </Routes>
  );
}
