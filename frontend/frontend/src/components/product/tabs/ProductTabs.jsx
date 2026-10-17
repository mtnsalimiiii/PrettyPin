import { useState } from "react";
import AccordionItem from "./AccordionItem.jsx";

const ProductTabs = ({ product }) => {
    // فقط یک آیتم می‌تواند در یک زمان باز باشد؛ کلیک روی همان آیتم آن را می‌بندد
    const [openId, setOpenId] = useState("");

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <div dir="rtl">
            <AccordionItem
                title="توضیحات محصول"
                isOpen={openId === "description"}
                onToggle={() => handleToggle("description")}
            >
                {product.description}
            </AccordionItem>

            <AccordionItem
                title="مشخصات محصول"
                isOpen={openId === "specs"}
                onToggle={() => handleToggle("specs")}
            >
                <p>جنس: مروارید مصنوعی و فلز طلایی</p>
            </AccordionItem>

            <AccordionItem
                title={`نظرات کاربران (${product.reviewCount})`}
                isOpen={openId === "reviews"}
                onToggle={() => handleToggle("reviews")}
            >
                {/* TODO: بعد از اتصال API، لیست واقعی نظرات اینجا رندر می‌شود */}
                <p>هنوز نظری برای این محصول ثبت نشده است.</p>
            </AccordionItem>


            <AccordionItem
                title="راهنمای ارسال و بازگشت"
                isOpen={openId === "shipping"}
                onToggle={() => handleToggle("shipping")}
            >
                <p>امکان بازگشت کالا تا ۷ روز پس از دریافت وجود دارد.</p>
            </AccordionItem>
        </div>
    );
};

export default ProductTabs;