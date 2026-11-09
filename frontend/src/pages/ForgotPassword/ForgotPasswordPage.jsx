import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import OtpInput from "../../components/common/OtpInput";
import authImage from "../../assets/images/10.webp";
import {
    requestPasswordResetOtp,
    verifyPasswordResetOtp,
    confirmPasswordReset,
} from "../../services/authService.js";

const RESEND_SECONDS = 60;

export default function ForgotPasswordPage() {
    const [step, setStep] = useState("phone"); // "phone" | "otp" | "newPassword"
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timer, setTimer] = useState(RESEND_SECONDS);
    const navigate = useNavigate();

    useEffect(() => {
        if (step !== "otp" || timer === 0) return;
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [step, timer]);

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await requestPasswordResetOtp(phone);
            setTimer(RESEND_SECONDS);
            setStep("otp");
        } catch (err) {
            setError(err.message || "ارسال کد تایید با خطا مواجه شد");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (otp.length < 4) {
            setError("کد تایید را کامل وارد کنید");
            return;
        }

        setError("");
        setIsSubmitting(true);
        try {
            const { resetToken: token } = await verifyPasswordResetOtp(phone, otp);
            setResetToken(token);
            setStep("newPassword");
        } catch (err) {
            setError(err.message || "کد تایید نامعتبر است");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        setError("");
        try {
            await requestPasswordResetOtp(phone);
            setOtp("");
            setTimer(RESEND_SECONDS);
        } catch (err) {
            setError(err.message || "ارسال مجدد کد با خطا مواجه شد");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.confirmPassword) {
            setError("رمز عبور و تکرار آن یکسان نیستند");
            return;
        }

        setError("");
        setIsSubmitting(true);
        try {
            await confirmPasswordReset(resetToken, passwords.password);
            navigate("/login");
        } catch (err) {
            setError(err.message || "ثبت رمز عبور جدید با خطا مواجه شد");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout imageSrc={authImage} imageAlt="اکسسوری مو زیبانو">
            <div className="w-full max-w-md">
                {step === "phone" && (
                    <>
                        <h1 className="text-2xl font-bold text-primary mb-2">فراموشی رمز عبور</h1>
                        <p className="text-gray-500 mb-8">
                            شماره موبایل خود را وارد کنید تا کد تایید برایتان ارسال شود
                        </p>

                        <form onSubmit={handlePhoneSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    شماره موبایل
                                </label>
                                <div className="relative">
                                    <input
                                        id="phone"
                                        type="tel"
                                        dir="ltr"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="0912 345 6789"
                                        className="w-full rounded-xl border border-gray-300 py-3 ps-4 pe-4 text-right outline-none transition-colors"
                                    />
                                    <Phone className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-black" size={18} />
                                </div>
                            </div>

                            {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? "در حال ارسال..." : "دریافت کد تایید"}
                            </button>
                        </form>

                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-primary mt-6 transition-colors"
                        >
                            <ArrowRight size={16} />
                            بازگشت به ورود
                        </Link>
                    </>
                )}

                {step === "otp" && (
                    <>
                        <h1 className="text-2xl font-bold text-primary mb-2">کد تایید را وارد کنید</h1>
                        <p className="text-gray-500 mb-8">
                            کد ۴ رقمی ارسال‌شده به شماره{" "}
                            <span dir="ltr" className="font-medium text-gray-700">{phone}</span> را وارد کنید
                        </p>

                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <OtpInput length={4} value={otp} onChange={setOtp} />

                            {error && <p className="text-sm p-3 text-red-500 text-center">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary-dark text-white my-5 py-3 rounded-xl font-medium transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? "در حال بررسی..." : "تایید کد"}
                            </button>
                        </form>

                        <div className="text-center text-sm text-gray-500 mt-6">
                            {timer > 0 ? (
                                <span>
                                    ارسال مجدد کد تا {String(Math.floor(timer / 60)).padStart(2, "0")}:
                                    {String(timer % 60).padStart(2, "0")}
                                </span>
                            ) : (
                                <button onClick={handleResend} className="text-accent font-medium hover:underline">
                                    ارسال مجدد کد
                                </button>
                            )}
                        </div>
                    </>
                )}

                {step === "newPassword" && (
                    <>
                        <h1 className="text-2xl font-bold text-primary mb-2">رمز عبور جدید</h1>
                        <p className="text-gray-500 mb-8">یک رمز عبور جدید برای حساب خود انتخاب کنید</p>

                        <form onSubmit={handlePasswordSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    رمز عبور جدید
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength={8}
                                        value={passwords.password}
                                        onChange={(e) => setPasswords((prev) => ({ ...prev, password: e.target.value }))}
                                        placeholder="حداقل ۸ کاراکتر"
                                        className="w-full rounded-xl border border-gray-300 py-3 ps-4 pe-11 outline-none transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-black"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    تکرار رمز عبور
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                        placeholder="رمز عبور را دوباره وارد کنید"
                                        className="w-full rounded-xl border border-gray-300 py-3 ps-4 pe-11 outline-none transition-colors"
                                    />
                                    <Lock className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-black" size={18} />
                                </div>
                            </div>

                            {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? "در حال ثبت..." : "ثبت رمز عبور جدید"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </AuthLayout>
    );
};