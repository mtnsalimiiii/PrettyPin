import { ChevronDown } from "lucide-react";

const AccordionItem = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between text-right"
            >
                <span className="text-base font-bold text-gray-900">{title}</span>
                <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="mt-3 text-sm leading-7 text-gray-600">{children}</div>
            )}
        </div>
    );
};

export default AccordionItem;