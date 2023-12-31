import { Route, Routes } from "react-router-dom";
import Orders from "./orders";
import Directions from "./route";
import Returns from "./returns";

export default function Tasks() {
  return (
    <Routes>
      <Route path="orders" element={<Orders />} />
      <Route path="route" element={<Directions />} />
      <Route path="returns" element={<Returns />} />
    </Routes>
  );
}
