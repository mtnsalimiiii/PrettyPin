import { useState } from "react";
import ProductMainImage from "./ProductMainImage.jsx";
import ProductThumbnails from "./ProductThumbnails.jsx";
import SliderDots from "../../common/SliderDots.jsx";

const ProductGallery = ({ images, badge, alt }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrev = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="flex flex-col gap-4 lg:flex-row">
            <ProductThumbnails
                images={images}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
            />

            <div className="flex-1">
                <ProductMainImage
                    image={images[activeIndex]}
                    badge={badge}
                    alt={alt}
                    onPrev={goToPrev}
                    onNext={goToNext}
                />

                <div className="mt-4 flex justify-center lg:hidden">
                    <SliderDots
                        total={images.length}
                        activeIndex={activeIndex}
                        onDotClick={setActiveIndex}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;