import Container from "../common/Container.jsx";
import FooterTrustBadges from "./FooterTrustBadges.jsx";
import FooterBottom from "./FooterBottom.jsx";

// نسخه خلاصه فوتر؛ برای صفحاتی مثل جزئیات محصول که نیازی به خبرنامه و ستون‌های لینک ندارند
const MinimalFooter = () => {
    return (
        <footer dir="rtl" className="bg-gray-900 pt-10 sm:pt-14">
            <Container>
                <div className="border-t border-gray-800 pt-8">
                    <h4 className="mb-4 text-right text-sm font-bold text-white">نمادهای اعتماد</h4>
                    <FooterTrustBadges />
                </div>

                <div className="mt-8 pb-8">
                    <FooterBottom />
                </div>
            </Container>
        </footer>
    );
};

export default MinimalFooter;