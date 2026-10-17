import { useState } from "react";
import ProductRating from "./ProductRating.jsx";
import ProductPrice from "./ProductPrice.jsx";
import ColorSelector from "./ColorSelector.jsx";
import SizeSelector from "./SizeSelector.jsx";
import AddToCartBar from "./AddToCartBar.jsx";
import { useCart } from "../../../context/CartContext.jsx";

const ProductInfo = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.id);
    const [quantity, setQuantity] = useState(1);

    const { addItem } = useCart();

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addItem(product, { color: selectedColor, size: selectedSize, quantity });
    };

    return (
        <div className="flex flex-col gap-5" dir="rtl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.title}</h1>
                <div className="mt-2">
                    <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
                </div>
            </div>

            <ProductPrice price={product.price} discountPercent={product.discountPercent} />

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
                {product.shortDescription}
            </p>

            <ColorSelector colors={product.colors} selectedColor={selectedColor} onSelect={setSelectedColor} />

            <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelect={setSelectedSize} />

            <AddToCartBar
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
};

export default ProductInfo;