import AuthHeader from "./AuthHeader.jsx";

export default function AuthLayout({ children, imageSrc, imageAlt }) {
    return (
        <div className="h-screen flex flex-col bg-blue-100 overflow-hidden">
            <AuthHeader />

            <div className="flex-1 min-h-0 grid lg:grid-cols-2">
                {/* فرم */}
                <div className="min-h-0 flex items-center justify-center p-6 lg:p-12">
                    <div className="w-full max-w-md max-h-full border bg-white rounded-3xl shadow-[0_0_35px_rgba(0,0,0,0.13)] p-8 lg:p-10 flex flex-col justify-center overflow-y-auto">
                        {children}
                    </div>
                </div>

                {/* تصویر */}
                <div className="hidden lg:flex min-h-0 items-center justify-center py-15 pl-20">
                    <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}