import { Minus, Plus, ShoppingBag } from "lucide-react";

const AddToCartBar = ({ quantity, onIncrease, onDecrease, onAddToCart, isOutOfStock = false }) => {
    return (
        <div className="flex items-center gap-3" dir="rtl">
            {/* disabled واقعی نمی‌گذاریم، چون آن‌وقت کلیک اصلاً ثبت نمی‌شود و توست نمایش داده نمی‌شود */}
            <button
                type="button"
                onClick={onAddToCart}
                aria-disabled={isOutOfStock}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold transition ${
                    isOutOfStock
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : "bg-primary text-white hover:bg-primary-dark"
                }`}
            >
                <ShoppingBag size={20} />
                {isOutOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            </button>

            <div
                className={`flex items-center gap-4 rounded-2xl border border-gray-300 px-4 py-3.5 ${
                    isOutOfStock ? "opacity-40" : ""
                }`}
            >
                <button
                    type="button"
                    onClick={onIncrease}
                    disabled={isOutOfStock}
                    className="text-gray-700 transition hover:text-primary disabled:cursor-not-allowed disabled:hover:text-gray-700"
                >
                    <Plus size={18} />
                </button>

                <span className="w-4 text-center text-base font-bold text-gray-900">{quantity}</span>

                <button
                    type="button"
                    onClick={onDecrease}
                    disabled={isOutOfStock || quantity <= 1}
                    className="text-gray-700 transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                >
                    <Minus size={18} />
                </button>
            </div>
        </div>
    );
};

export default AddToCartBar;