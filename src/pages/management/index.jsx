import { Route, Routes } from "react-router-dom";
import AllUsers from "./users";
import Drivers from "./drivers";
import Vehicles from "./vehicles";

export default function Managements() {
  return (
    <Routes>
      <Route index element={<AllUsers />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/vehicles" element={<Vehicles />} />
    </Routes>
  );
}
