import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Expand } from "lucide-react";

const ProductMainImage = ({ image, alt = "تصویر محصول", badge, onPrev, onNext }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);

    const isZoomed = zoomedImage === image;

    const handleToggleZoom = () => {
        setZoomedImage(isZoomed ? null : image);
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 sm:rounded-3xl">
            {/* بج (مثلاً «پرفروش») - گوشه بالا-چپ */}
            {badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold text-orange-500 sm:text-sm">
                    {badge}
                </span>
            )}

            {/* آیکون علاقه‌مندی - گوشه بالا-راست */}
            <button
                type="button"
                aria-label="افزودن به علاقه‌مندی‌ها"
                aria-pressed={isFavorite}
                onClick={() => setIsFavorite((prev) => !prev)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-110 sm:h-10 sm:w-10"
            >
                <Heart
                    size={18}
                    className={isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-700"}
                />
            </button>

            {/* تصویر اصلی */}
            <div className="flex flex-col items-center p-4">
                <div className="w-full overflow-hidden">
                    <img
                        src={image}
                        alt={alt}
                        className={`block w-full object-cover transition-transform duration-500 ${
                            isZoomed ? "scale-150" : "scale-100"
                        }`}
                    />
                </div>
            </div>

            {/* فلش قبلی */}
            <button
                type="button"
                aria-label="تصویر قبلی"
                onClick={onPrev}
                className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white sm:h-11 sm:w-11"
            >
                <ChevronLeft size={20} />
            </button>

            {/* فلش بعدی */}
            <button
                type="button"
                aria-label="تصویر بعدی"
                onClick={onNext}
                className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white sm:h-11 sm:w-11"
            >
                <ChevronRight size={20} />
            </button>

            {/* دکمه بزرگ‌نمایی - گوشه پایین-راست */}
            <button
                type="button"
                aria-label={isZoomed ? "خروج از بزرگ‌نمایی" : "بزرگ‌نمایی تصویر"}
                aria-pressed={isZoomed}
                onClick={handleToggleZoom}
                className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-110 sm:h-10 sm:w-10"
            >
                <Expand size={16} className="text-gray-700" />
            </button>
        </div>
    );
};

export default ProductMainImage;