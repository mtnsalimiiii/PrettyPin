import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../../components/common/Container.jsx";
import MainHeader from "../../components/header/mainHeader/MainHeader.jsx";
import MobileMenu from "../../components/header/MobileMenu.jsx";
import MinimalFooter from "../../components/footer/MinimalFooter.jsx";
import CartItemCard from "../../components/cart/CartItemCard.jsx";
import OrderSummary from "../../components/cart/OrderSummary.jsx";
import DeliveryTimeSelector from "../../components/cart/DeliveryTimeSelector.jsx";
import AddressStep from "../../components/cart/AddressStep.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { getDeliveryDays } from "../../data/deliverySlots.js";

const STEPS = { CART: "cart", DELIVERY: "delivery", ADDRESS: "address" };

// TODO: اعتبارسنجی کد تخفیف باید با API انجام شود
const MOCK_DISCOUNT_CODES = { ZIBANO10: 10 };

const CartPage = () => {
    const { items, totalPrice, increaseItem, decreaseItem } = useCart();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [step, setStep] = useState(STEPS.CART);
    const [discount, setDiscount] = useState({ code: "", percent: 0 });
    const [discountError, setDiscountError] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const days = useMemo(() => getDeliveryDays(), []);
    const selectedDayData = days.find((d) => d.id === selectedDay);

    const discountAmount = (totalPrice * discount.percent) / 100;
    const shippingCost = selectedDayData?.price ?? 0;
    const payable = totalPrice - discountAmount + shippingCost;

    const handleApplyCode = (code) => {
        const percent = MOCK_DISCOUNT_CODES[code.toUpperCase()];
        if (!percent) {
            setDiscount({ code: "", percent: 0 });
            setDiscountError("کد تخفیف نامعتبر است");
            return;
        }
        setDiscountError("");
        setDiscount({ code: code.toUpperCase(), percent });
    };

    const handleCheckout = (addressData) => {
        // TODO: ارسال سفارش به API (POST /orders/checkout/)
        console.log("ثبت سفارش:", { items, selectedDay, selectedTime, discount, ...addressData });
    };

    const header = (
        <>
            <MainHeader isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((p) => !p)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );

    if (items.length === 0) {
        return (
            <>
                {header}
                <div dir="rtl" className="bg-blue-50 py-24 text-center">
                    <p className="text-lg text-gray-600">سبد خرید شما خالی است.</p>
                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                        بازگشت به فروشگاه
                    </Link>
                </div>
                <MinimalFooter />
            </>
        );
    }

    return (
        <>
            {header}

            <div dir="rtl" className="bg-blue-50 py-6 sm:py-10">
                <Container>
                    {step !== STEPS.CART && (
                        <button
                            type="button"
                            onClick={() => setStep(step === STEPS.ADDRESS ? STEPS.DELIVERY : STEPS.CART)}
                            className="mb-4 flex items-center gap-1 text-sm font-semibold text-gray-600 transition hover:text-primary"
                        >
                            <ArrowRight size={16} />
                            مرحله قبل
                        </button>
                    )}

                    {/* در RTL ستون اول سمت راست است: پنل راست، لیست محصولات چپ (مطابق دیزاین) */}
                    <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:items-start">
                        <div className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1">
                            {items.map((item) => (
                                <CartItemCard
                                    key={item.key}
                                    item={item}
                                    editable={step === STEPS.CART}
                                    onIncrease={() => increaseItem(item.key)}
                                    onDecrease={() => decreaseItem(item.key)}
                                />
                            ))}
                        </div>

                        <div className="lg:col-start-1 lg:row-start-1">
                            {step === STEPS.CART && (
                                <OrderSummary
                                    subtotal={totalPrice}
                                    shippingCost={shippingCost}
                                    discountAmount={discountAmount}
                                    payable={payable}
                                    appliedCode={discount.code}
                                    discountError={discountError}
                                    onApplyCode={handleApplyCode}
                                    onSubmit={() => setStep(STEPS.DELIVERY)}
                                />
                            )}

                            {step === STEPS.DELIVERY && (
                                <DeliveryTimeSelector
                                    days={days}
                                    selectedDay={selectedDay}
                                    selectedTime={selectedTime}
                                    onSelectDay={setSelectedDay}
                                    onSelectTime={setSelectedTime}
                                    onSubmit={() => setStep(STEPS.ADDRESS)}
                                />
                            )}

                            {step === STEPS.ADDRESS && <AddressStep onSubmit={handleCheckout} />}
                        </div>
                    </div>
                </Container>
            </div>

            <MinimalFooter />
        </>
    );
};

export default CartPage;