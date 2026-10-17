const SizeSelector = ({ sizes, selectedSize, onSelect }) => {
    return (
        <div dir="rtl">
            <p className="mb-3 text-sm font-medium text-gray-700">سایز:</p>

            <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                    <button
                        key={size.id}
                        type="button"
                        onClick={() => onSelect(size.id)}
                        className={`rounded-xl border px-6 py-2.5 text-sm font-semibold transition ${
                            selectedSize === size.id
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                        {size.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SizeSelector;