import { useRef } from "react";

export default function OtpInput({ length = 4, value, onChange }) {
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const digit = e.target.value.replace(/\D/g, "").slice(-1);
        const newValue = value.split("");
        newValue[index] = digit || "";
        onChange(newValue.join(""));

        if (digit && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex justify-center gap-3" dir="ltr">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 outline-none focus:border-primary transition-colors"
                />
            ))}
        </div>
    );
}