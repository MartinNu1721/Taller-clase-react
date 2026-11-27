import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Sum from "./pages/Sum";
import Calculator from "./pages/Calculator";
import Form from "./pages/Form";
import ApiSearch from "./pages/ApiSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sum" element={<Sum />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/form" element={<Form />} />
        <Route path="/api" element={<ApiSearch />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;