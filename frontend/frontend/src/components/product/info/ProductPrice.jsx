import { formatPrice, getDiscountedPrice } from "../../../utils/price.js";

const ProductPrice = ({ price, discountPercent }) => {
    const hasDiscount = discountPercent > 0;
    const finalPrice = getDiscountedPrice(price, discountPercent);

    return (
        <div className="flex flex-wrap items-center gap-3" dir="rtl">
            <span className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {formatPrice(finalPrice)} تومان
            </span>

            {hasDiscount && (
                <span className="text-base text-gray-400 line-through">
                    {formatPrice(price)} تومان
                </span>
            )}

            {hasDiscount && (
                <span className="rounded-full bg-pink-500 px-3 py-1 text-sm font-bold text-white">
                    {discountPercent}٪ تخفیف
                </span>
            )}
        </div>
    );
};

export default ProductPrice;