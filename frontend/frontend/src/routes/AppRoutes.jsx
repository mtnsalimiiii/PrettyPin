import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/Home.jsx";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
    </Routes>
  );
}