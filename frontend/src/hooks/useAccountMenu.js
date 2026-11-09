import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useAccountMenu() {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    // به‌جای خروج فوری، فقط درخواست تایید را ثبت می‌کند
    const requestLogout = (e) => {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض <a href="#">
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        setShowLogoutConfirm(false);
        navigate("/");
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return {
        isLoggedIn,
        user,
        showLogoutConfirm,
        requestLogout,
        confirmLogout,
        cancelLogout,
    };
}