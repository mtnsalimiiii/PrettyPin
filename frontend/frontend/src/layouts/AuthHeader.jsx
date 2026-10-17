import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Logo from "../components/header/mainHeader/Logo.jsx";

export default function AuthHeader() {
    return (
        <header className="w-full py-2 px-8 sm:px-8 flex items-center bg-blue-100">
            {/* ستون راست: دکمه بازگشت */}
            <div className="flex-1 flex justify-start">
                <Link
                    to="/"
                    className="flex items-center gap-1.5 text-sm font-medium text-black sm:text-gray-600 sm:hover:text-black transition-colors"
                >
                    <Home size={26} sm:size={18} />
                    <span className="hidden sm:inline">صفحه اصلی</span>
                </Link>
            </div>

            {/* ستون وسط: لوگو */}
            <div className="flex-1 flex justify-center">
                <Logo />
            </div>

            {/* ستون چپ: فضای خالی برای تعادل */}
            <div className="flex-1" />
        </header>
    );
}