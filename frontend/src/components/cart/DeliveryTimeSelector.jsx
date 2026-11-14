import { Truck } from "lucide-react";
import { formatPrice } from "../../utils/price.js";
import { deliveryTimeWindows } from "../../data/deliverySlots.js";

const DeliveryTimeSelector = ({ days, selectedDay, selectedTime, onSelectDay, onSelectTime, onSubmit }) => {
    const canContinue = Boolean(selectedDay && selectedTime);

    return (
        <div dir="rtl" className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">انتخاب زمان ارسال</h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Truck size={20} className="text-sky-500" />
                ارسال عادی
            </p>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {days.map((day) => {
                    const isActive = selectedDay === day.id;
                    return (
                        <button
                            key={day.id}
                            type="button"
                            onClick={() => onSelectDay(day.id)}
                            className={`flex w-28 shrink-0 flex-col items-center gap-1 rounded-xl border-2 p-2 transition ${
                                isActive ? "border-gray-900" : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <span className="text-sm">{day.weekday}</span>
                            <span className="text-sm font-bold">
                                {day.day} <span className="font-normal text-gray-500">{day.month}</span>
                            </span>

                            <span className="mt-1 flex w-full flex-col items-center rounded-lg bg-gray-100 py-2">
                                <span className="text-[10px] text-gray-400 line-through">
                                    {formatPrice(day.originalPrice)} تومان
                                </span>
                                <span className="text-xs font-bold">{formatPrice(day.price)} تومان</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 border-t border-gray-400 pt-4">
                <div className="flex flex-col gap-3">
                    {deliveryTimeWindows.map((time) => (
                        <label key={time.id} className="flex cursor-pointer items-center gap-3 text-sm">
                            <input
                                type="radio"
                                name="delivery-time"
                                checked={selectedTime === time.id}
                                onChange={() => onSelectTime(time.id)}
                                className="h-5 w-5 accent-primary"
                            />
                            {time.label}
                        </label>
                    ))}
                </div>
            </div>

            <button
                type="button"
                disabled={!canContinue}
                onClick={onSubmit}
                className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
                ادامه
            </button>
        </div>
    );
};

export default DeliveryTimeSelector;