import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../../utils/price.js";

// editable=false در مرحله‌های ۲ و ۳: فقط نمایش، بدون کنترل تعداد
const CartItemCard = ({ item, editable = false, onIncrease, onDecrease }) => {
    return (
        <div
            dir="rtl"
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-3 sm:gap-6 sm:p-5"
        >
            <div className="flex flex-1 flex-col gap-2 text-right">
                <h3 className="text-base font-bold text-gray-900 sm:text-xl">{item.title}</h3>

                {item.colorLabel && (
                    <p className="text-sm text-gray-600 sm:text-base">رنگ: {item.colorLabel}</p>
                )}
                {item.sizeLabel && (
                    <p className="text-sm text-gray-600 sm:text-base">سایز: {item.sizeLabel}</p>
                )}

                <p className="text-sm font-semibold text-gray-900 sm:text-base">
                    قیمت: {formatPrice(item.price)} تومان
                </p>

                {editable && (
                    <div className="mt-1 flex w-fit items-center rounded-lg border border-gray-400">
                        {/* در RTL اولین فرزند سمت راست می‌نشیند */}
                        <button
                            type="button"
                            aria-label="افزایش تعداد"
                            onClick={onIncrease}
                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:text-primary"
                        >
                            <Plus size={16} />
                        </button>

                        <span className="w-10 border-x border-gray-300 text-center text-base font-bold">
                            {item.quantity.toLocaleString("fa-IR")}
                        </span>

                        {/* وقتی تعداد ۱ است، دکمه کاهش به سطل زباله تبدیل می‌شود (reducer خودش آیتم صفرشده را حذف می‌کند) */}
                        <button
                            type="button"
                            aria-label={item.quantity > 1 ? "کاهش تعداد" : "حذف از سبد"}
                            onClick={onDecrease}
                            className="flex h-9 w-9 items-center justify-center transition hover:text-red-600"
                        >
                            {item.quantity > 1 ? (
                                <Minus size={16} className="text-gray-600" />
                            ) : (
                                <Trash2 size={16} className="text-red-500" />
                            )}
                        </button>
                    </div>
                )}

                {!editable && (
                    <p className="text-sm text-gray-500">
                        تعداد: {item.quantity.toLocaleString("fa-IR")}
                    </p>
                )}
            </div>

            <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 shrink-0 rounded-xl bg-gray-200 object-cover sm:h-40 sm:w-40"
            />
        </div>
    );
};

export default CartItemCard;