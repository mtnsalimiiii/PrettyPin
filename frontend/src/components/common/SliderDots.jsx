// نسخه عمومی «نقطه‌های اسلایدر»، برای استفاده در گالری محصول و هر اسلایدر دیگری با پس‌زمینه روشن
// نسخه مخصوص Hero صفحه اصلی (رنگ سفید روی عکس تیره) جداگانه در home/hero باقی می‌ماند
const SliderDots = ({ total, activeIndex, onDotClick }) => {
    return (
        <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onDotClick(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                        index === activeIndex ? "w-5 bg-primary sm:w-6" : "w-1.5 bg-gray-300 sm:w-2"
                    }`}
                />
            ))}
        </div>
    );
};

export default SliderDots;