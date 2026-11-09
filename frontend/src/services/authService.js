import axiosClient from "../api/axiosClient.js";

// درخواست ورود - phone و password می‌گیرد، { user, token } برمی‌گرداند
export async function loginRequest(phone, password) {
    const { data } = await axiosClient.post("/auth/login/", { phone, password });
    return data;
}

// درخواست ثبت‌نام - اطلاعات کاربر می‌گیرد، { user, token } برمی‌گرداند
export async function registerRequest(fullName, phone, password) {
    const { data } = await axiosClient.post("/auth/register/", {
        full_name: fullName,
        phone,
        password,
    });
    return data;
}

// فراموشی رمز عبور - مرحله ۱: درخواست ارسال کد تایید به شماره موبایل
export async function requestPasswordResetOtp(phone) {
    const { data } = await axiosClient.post("/auth/password-reset/request/", { phone });
    return data;
}

// فراموشی رمز عبور - مرحله ۲: بررسی کد تایید، در صورت صحت { resetToken } برمی‌گرداند
export async function verifyPasswordResetOtp(phone, otp) {
    const { data } = await axiosClient.post("/auth/password-reset/verify/", { phone, otp });
    return data;
}

// فراموشی رمز عبور - مرحله ۳: ثبت رمز عبور جدید با استفاده از resetToken
export async function confirmPasswordReset(resetToken, password) {
    const { data } = await axiosClient.post("/auth/password-reset/confirm/", {
        reset_token: resetToken,
        password,
    });
    return data;
}