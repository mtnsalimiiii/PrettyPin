import { useState } from "react";
import { MapPin } from "lucide-react";
import EditableField from "./EditableField.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const AddressStep = ({ onSubmit }) => {
    const { user } = useAuth();

    // TODO: بعد از اتصال API، آدرس پیش‌فرض کاربر از سرور خوانده می‌شود
    const [address] = useState("ابهر، خیابان ولیعصر، جنب کوچه دبیرستان ایران");
    const [form, setForm] = useState({
        postalCode: "",
        receiver: user?.fullName ?? "",
        phone: user?.phone ?? "",
    });

    const handleChange = (name) => (value) => setForm((prev) => ({ ...prev, [name]: value }));

    return (
        <div dir="rtl" className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex items-start gap-2 rounded-xl border border-sky-400 p-4 text-sm leading-7 text-gray-800">
                <MapPin size={18} className="mt-1 shrink-0 text-sky-500" />
                <p>{address}</p>
            </div>

            <div className="mt-5 flex flex-col gap-4">
                <EditableField label="کد پستی:" value={form.postalCode} onChange={handleChange("postalCode")} ltr />
                <EditableField label="نام گیرنده:" value={form.receiver} onChange={handleChange("receiver")} />
                <EditableField label="شماره تماس:" value={form.phone} onChange={handleChange("phone")} ltr />
            </div>

            <button
                type="button"
                onClick={() => onSubmit({ address, ...form })}
                className="mx-auto mt-6 block rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
                ثبت و پرداخت
            </button>
        </div>
    );
};

export default AddressStep;