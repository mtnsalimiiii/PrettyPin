import { useEffect } from "react";
import { createPortal } from "react-dom";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { X, Plus, Minus, RotateCcw } from "lucide-react";

const buttonStyle =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white";

// useControls فقط داخل TransformWrapper کار می‌کند، برای همین جدا نوشته شده
const Controls = ({ onClose }) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
        <div dir="ltr" className="absolute inset-x-0 top-4 z-10 flex items-center justify-between px-4">
            <button type="button" aria-label="بستن" onClick={onClose} className={buttonStyle}>
                <X size={20} />
            </button>

            <div className="flex gap-2">
                <button type="button" aria-label="بزرگ‌نمایی" onClick={() => zoomIn()} className={buttonStyle}>
                    <Plus size={20} />
                </button>
                <button type="button" aria-label="کوچک‌نمایی" onClick={() => zoomOut()} className={buttonStyle}>
                    <Minus size={20} />
                </button>
                <button type="button" aria-label="بازنشانی" onClick={() => resetTransform()} className={buttonStyle}>
                    <RotateCcw size={18} />
                </button>
            </div>
        </div>
    );
};

const ImageLightbox = ({ isOpen, image, alt, onClose }) => {
    // بستن با Esc و قفل اسکرول صفحه پشت مودال
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 bg-black/90">
            <TransformWrapper
                minScale={1}
                maxScale={6}
                centerOnInit
                wheel={{ step: 0.2 }}
                doubleClick={{ mode: "toggle", step: 2 }}
            >
                <Controls onClose={onClose} />

                <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img src={image} alt={alt} className="max-h-full max-w-full object-contain" />
                </TransformComponent>
            </TransformWrapper>
        </div>,
        document.body
    );
};

export default ImageLightbox;