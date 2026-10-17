import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// items: آرایه‌ای از { label, href }
// آخرین آیتم به‌عنوان صفحه فعلی در نظر گرفته می‌شود و لینک نمی‌خورد
const Breadcrumb = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.href || item.label} className="flex items-center gap-1.5">
                            {isLast ? (
                                <span className="font-medium text-gray-800">{item.label}</span>
                            ) : (
                                <Link to={item.href} className="transition hover:text-pink-500">
                                    {item.label}
                                </Link>
                            )}

                            {!isLast && <ChevronLeft size={14} className="text-gray-400" />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;