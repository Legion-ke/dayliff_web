import { Route, Routes } from "react-router-dom";
import Orders from "./orders";
import Directions from "./route";

export default function Tasks() {
  return (
    <Routes>
      <Route index element={<Orders />} />
      <Route path="route" element={<Directions/>} />
    </Routes>
  );
}
