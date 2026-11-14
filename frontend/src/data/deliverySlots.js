// TODO: بعد از اتصال API، روزها و قیمت‌ها از سرور می‌آیند
const DAYS_COUNT = 5;

export const deliveryTimeWindows = [
    { id: "9-15", label: "ساعت ۹ تا ۱۵" },
    { id: "18-21", label: "ساعت ۱۸ تا ۲۱" },
];

export function getDeliveryDays() {
    return Array.from({ length: DAYS_COUNT }).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index + 1);

        return {
            id: date.toISOString().slice(0, 10),
            weekday: date.toLocaleDateString("fa-IR", { weekday: "long" }),
            day: date.toLocaleDateString("fa-IR", { day: "numeric" }),
            month: date.toLocaleDateString("fa-IR", { month: "long" }),
            originalPrice: 100000,
            price: 80000,
        };
    });
}