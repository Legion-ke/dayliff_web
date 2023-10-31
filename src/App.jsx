import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AlertProvider } from "ochom-react-components";
import Admin from "./layouts/main";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
