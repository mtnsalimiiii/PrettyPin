// ستون تصاویر کوچک کنار عکس اصلی - فقط در دسکتاپ نمایش داده می‌شود
const ProductThumbnails = ({ images, activeIndex, onSelect }) => {
    return (
        <div className="hidden flex-col gap-3 lg:flex">
            {images.map((image, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onSelect(index)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition xl:h-24 xl:w-24 ${
                        index === activeIndex
                            ? "border-primary"
                            : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                    <img
                        src={image}
                        alt={`تصویر شماره ${index + 1}`}
                        className="h-full w-full object-cover"
                    />
                </button>
            ))}
        </div>
    );
};

export default ProductThumbnails;