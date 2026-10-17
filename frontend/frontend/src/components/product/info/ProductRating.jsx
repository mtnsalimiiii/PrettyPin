import { Star } from "lucide-react";

const ProductRating = ({ rating, reviewCount }) => {
    return (
        <div className="flex items-center gap-2" dir="rtl">
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        size={16}
                        className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                ))}
            </div>

            <span className="text-sm text-gray-500">({reviewCount} نظر)</span>
        </div>
    );
};

export default ProductRating;