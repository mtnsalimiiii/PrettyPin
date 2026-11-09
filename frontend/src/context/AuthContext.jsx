import { createContext, useContext, useReducer } from "react";
import { loginRequest, registerRequest } from "../services/authService.js";

const AuthContext = createContext(null);

const TOKEN_KEY = "prettypin_token";
const USER_KEY = "prettypin_user";

const initialState = {
    isLoggedIn: false,
    user: null, // { fullName, phone, ... } — ساختار دقیق را بک‌اند مشخص می‌کند
    token: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { isLoggedIn: true, user: action.payload.user, token: action.payload.token };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}

// state اولیه را از localStorage می‌خواند تا هنگام رفرش صفحه، لاگین بدون فلیکر بازیابی شود
function initAuthState() {
    const token = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (token && savedUser) {
        return { isLoggedIn: true, user: JSON.parse(savedUser), token };
    }
    return initialState;
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState, initAuthState);

    const persistSession = (user, token) => {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    };

    const login = async (phone, password) => {
        const { user, token } = await loginRequest(phone, password);
        persistSession(user, token);
        dispatch({ type: "LOGIN", payload: { user, token } });
    };

    const register = async (fullName, phone, password) => {
        const { user, token } = await registerRequest(fullName, phone, password);
        persistSession(user, token);
        dispatch({ type: "LOGIN", payload: { user, token } });
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth باید داخل AuthProvider استفاده شود");
    }
    return context;
}