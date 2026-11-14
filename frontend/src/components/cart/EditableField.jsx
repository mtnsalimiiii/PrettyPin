import { useState } from "react";
import { Pencil, Check } from "lucide-react";

// یک ردیف «برچسب: مقدار» با آیکون مداد که با کلیک، مقدار را قابل ویرایش می‌کند
const EditableField = ({ label, value, onChange, ltr = false }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div dir="rtl" className="flex items-center gap-2 text-sm">
            <span className="shrink-0 text-gray-700">{label}</span>

            {isEditing ? (
                <input
                    autoFocus
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                    dir={ltr ? "ltr" : "rtl"}
                    className="h-8 min-w-0 flex-1 rounded-md border border-gray-300 px-2 text-right outline-none focus:border-primary"
                />
            ) : (
                <span className="flex-1 text-gray-900" dir={ltr ? "ltr" : "rtl"}>
                    {value || "—"}
                </span>
            )}

            <button
                type="button"
                aria-label={isEditing ? "ثبت تغییر" : "ویرایش"}
                onClick={() => setIsEditing((prev) => !prev)}
                className="shrink-0 text-sky-500 transition hover:text-sky-700"
            >
                {isEditing ? <Check size={16} /> : <Pencil size={16} />}
            </button>
        </div>
    );
};

export default EditableField;