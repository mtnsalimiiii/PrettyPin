import { useState } from "react";
import { formatPrice } from "../../utils/price.js";

const OrderSummary = ({
                          subtotal,
                          shippingCost,
                          discountAmount,
                          payable,
                          appliedCode,
                          discountError,
                          onApplyCode,
                          onSubmit,
                      }) => {
    const [code, setCode] = useState("");

    const handleApply = (e) => {
        e.preventDefault();
        onApplyCode(code.trim());
    };

    return (
        <div dir="rtl" className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">خلاصه سفارش</h2>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-700 sm:text-base">
                <p>جمع کل محصولات : {formatPrice(subtotal)} تومان</p>
                <p>
                    هزینه ارسال : {shippingCost > 0 ? `${formatPrice(shippingCost)} تومان` : "رایگان"}
                </p>
                {discountAmount > 0 && (
                    <p className="text-green-600">
                        تخفیف ({appliedCode}) : {formatPrice(discountAmount)} تومان
                    </p>
                )}
                <p>کد تخفیف</p>
            </div>

            <form onSubmit={handleApply} className="mt-2 flex gap-2">
                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="کد را وارد کنید"
                    dir="ltr"
                    className="h-10 min-w-0 flex-1 rounded-lg border border-gray-300 px-3 text-right text-sm outline-none focus:border-primary"
                />
                <button
                    type="submit"
                    className="h-10 shrink-0 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                    اعمال
                </button>
            </form>
            {discountError && <p className="mt-2 text-xs text-red-500">{discountError}</p>}

            <div className="my-5 border-t border-gray-300" />

            <div className="flex items-center justify-between font-bold text-gray-900">
                <span className="text-base sm:text-lg">قابل پرداخت</span>
                <span className="text-base sm:text-lg">{formatPrice(payable)} تومان</span>
            </div>

            <button
                type="button"
                onClick={onSubmit}
                className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark sm:text-base"
            >
                ثبت سفارش
            </button>
        </div>
    );
};

export default OrderSummary;