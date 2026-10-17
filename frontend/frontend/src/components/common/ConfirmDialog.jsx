// کامپوننت عمومی و قابل استفاده مجدد برای تایید هر عملیات حساس (خروج، حذف و ...)
// خودش state باز/بسته بودن رو نگه نمی‌داره؛ فقط بر اساس prop isOpen رندر می‌شود.
const ConfirmDialog = ({
                           isOpen,
                           title,
                           message,
                           confirmLabel = "تایید",
                           cancelLabel = "انصراف",
                           onConfirm,
                           onCancel,
                       }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <p className="mt-2 text-sm text-gray-600">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;