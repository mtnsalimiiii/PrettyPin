import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "prettypin_cart";

const initialState = {
    items: [], // هر آیتم: { key, productId, title, image, price, discountPercent, color, size, quantity }
};

function buildKey(productId, color, size) {
    return [productId, color ?? "default", size ?? "default"].join("-");
}

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const { item } = action.payload;
            const existing = state.items.find((i) => i.key === item.key);

            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.key === item.key ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                };
            }

            return { items: [...state.items, item] };
        }

        case "INCREASE":
            return {
                items: state.items.map((i) =>
                    i.key === action.payload.key ? { ...i, quantity: i.quantity + 1 } : i
                ),
            };

        case "DECREASE":
            return {
                items: state.items
                    .map((i) =>
                        i.key === action.payload.key ? { ...i, quantity: i.quantity - 1 } : i
                    )
                    .filter((i) => i.quantity > 0),
            };

        case "REMOVE_ITEM":
            return { items: state.items.filter((i) => i.key !== action.payload.key) };

        case "CLEAR":
            return initialState;

        default:
            return state;
    }
}

// state اولیه را از localStorage می‌خواند تا هنگام رفرش صفحه سبد خرید خالی نشود
function initCartState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { items: JSON.parse(raw) } : initialState;
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState, initCartState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (product, { color, size, quantity = 1 } = {}) => {
        const key = buildKey(product.id, color, size);
        const finalPrice = product.discountPercent
            ? product.price - (product.price * product.discountPercent) / 100
            : product.price;

        dispatch({
            type: "ADD_ITEM",
            payload: {
                item: {
                    key,
                    productId: product.id,
                    title: product.title,
                    image: product.image,
                    price: finalPrice,
                    color: color ?? null,
                    size: size ?? null,
                    quantity,
                },
            },
        });
    };

    const increaseItem = (key) => dispatch({ type: "INCREASE", payload: { key } });
    const decreaseItem = (key) => dispatch({ type: "DECREASE", payload: { key } });
    const removeItem = (key) => dispatch({ type: "REMOVE_ITEM", payload: { key } });
    const clearCart = () => dispatch({ type: "CLEAR" });

    const totalCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // داخل CartProvider، کنار بقیه توابع:
    const getItemQuantity = (productId, color = null, size = null) => {
        const key = buildKey(productId, color, size);
        const item = state.items.find((i) => i.key === key);
        return item ? item.quantity : 0;
    };

    const getItemKey = (productId, color = null, size = null) => buildKey(productId, color, size);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addItem,
                increaseItem,
                decreaseItem,
                removeItem,
                clearCart,
                totalCount,
                totalPrice,
                getItemQuantity,
                getItemKey,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart باید داخل CartProvider استفاده شود");
    }
    return context;
}