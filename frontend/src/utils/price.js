// توابع کمکی مشترک برای محاسبه و نمایش قیمت محصولات
// نکته: منطق مشابهی هم‌اکنون به‌صورت محلی در ProductCard.jsx وجود دارد؛
// در فرصت مناسب می‌توان آنجا را هم به این توابع مشترک منتقل کرد (Refactor آینده)

export function formatPrice(price) {
    return price.toLocaleString("fa-IR");
}

export function getDiscountedPrice(price, discountPercent) {
    if (!discountPercent) return price;
    return price - (price * discountPercent) / 100;
}