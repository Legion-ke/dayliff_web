import { Route, Routes } from "react-router-dom";
import AllUsers from "./users";
import Vehicles from "./vehicles";

export default function Managements() {
  return (
    <Routes>
      <Route index element={<AllUsers />} />
      <Route path="vehicles" element={<Vehicles />} />
    </Routes>
  );
}
