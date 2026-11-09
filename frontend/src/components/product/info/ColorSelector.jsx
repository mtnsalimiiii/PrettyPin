const ColorSelector = ({ colors, selectedColor, onSelect }) => {
    const activeColor = colors.find((c) => c.id === selectedColor);

    return (
        <div dir="rtl">
            <p className="mb-3 text-sm font-medium text-gray-700">
                رنگ: <span className="font-bold text-gray-900">{activeColor?.label}</span>
            </p>

            <div className="flex items-center gap-3">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        type="button"
                        onClick={() => onSelect(color.id)}
                        className={`h-9 w-9 rounded-full border-2 p-0.5 transition ${
                            selectedColor === color.id ? "border-primary" : "border-transparent hover:border-gray-300"
                        }`}
                    >
                        {/* رنگ از دیتا می‌آید، پس نمی‌توان از کلاس Tailwind استفاده کرد؛ باید inline style باشد */}
                        <span
                            className="block h-full w-full rounded-full border border-black/10"
                            style={{ backgroundColor: color.hex }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;