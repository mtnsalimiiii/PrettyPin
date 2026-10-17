import axios from "axios";

// آدرس پایه API — بعد از آماده شدن بک‌اند، فقط این مقدار (یا .env) عوض می‌شود
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://api.example.com";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// توکن احراز هویت را به‌صورت خودکار به هر درخواست اضافه می‌کند
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("prettypin_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// خطاهای سرور را به یک پیام یکدست تبدیل می‌کند تا کامپوننت‌ها راحت نمایشش بدهند
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "خطایی در ارتباط با سرور رخ داد";
        return Promise.reject(new Error(message));
    }
);

export default axiosClient;