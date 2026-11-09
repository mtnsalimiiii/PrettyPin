import { Minus, Plus, ShoppingBag } from "lucide-react";

const AddToCartBar = ({ quantity, onIncrease, onDecrease, onAddToCart }) => {
    return (
        <div className="flex items-center gap-3" dir="rtl">
            {/* این دکمه اول نوشته می‌شود تا در dir="rtl" سمت راست بنشیند */}
            <button
                type="button"
                onClick={onAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-base font-bold text-white transition hover:bg-primary-dark"
            >
                <ShoppingBag size={20} />
                افزودن به سبد خرید
            </button>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-300 px-4 py-3.5">
                <button type="button" onClick={onIncrease} className="text-gray-700 transition hover:text-primary">
                    <Plus size={18} />
                </button>

                <span className="w-4 text-center text-base font-bold text-gray-900">{quantity}</span>

                <button
                    type="button"
                    onClick={onDecrease}
                    disabled={quantity <= 1}
                    className="text-gray-700 transition hover:text-primary disabled:opacity-30"
                >
                    <Minus size={18} />
                </button>
            </div>
        </div>
    );
};

export default AddToCartBar;