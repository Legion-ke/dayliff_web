import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AlertProvider } from "ochom-react-components";
import Admin from "./layouts/main";
import Auth from "./pages/auth";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Admin />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
