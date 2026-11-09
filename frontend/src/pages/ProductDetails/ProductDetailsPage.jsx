import { useParams } from "react-router-dom";
import Container from "../../components/common/Container.jsx";
import Breadcrumb from "../../components/common/Breadcrumb.jsx";
import ProductGallery from "../../components/product/gallery/ProductGallery.jsx";
import ProductInfo from "../../components/product/info/ProductInfo.jsx";
import TrustBadges from "../../components/product/TrustBadges.jsx";
import ProductTabs from "../../components/product/tabs/ProductTabs.jsx";
import { getProductById } from "../../data/products.js";
import MainHeader from "../../components/header/mainHeader/MainHeader.jsx";
import { useState } from "react";
import MobileMenu from "../../components/header/MobileMenu.jsx";
import MinimalFooter from "../../components/footer/MinimalFooter.jsx";
import Footer from "../../components/footer/Footer.jsx";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const product = getProductById(id);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // اگر با یک id نامعتبر وارد این صفحه شویم (مثلاً لینک خراب)
    if (!product) {
        return (
            <>
                <MainHeader
                    isMenuOpen={isMenuOpen}
                    onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
                />
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                <div className="py-20 text-center text-gray-500">محصول مورد نظر یافت نشد.</div>
                <Footer />
            </>
        );
    }

    const breadcrumbItems = [
        { label: "خانه", href: "/" },
        ...product.categoryPath,
        { label: product.title },
    ];

    return (
        <>
            <MainHeader
                isMenuOpen={isMenuOpen}
                onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
            />

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div dir="rtl" className="py-6 sm:py-8">
                <Container>
                    <div className="mb-6">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        <ProductGallery images={product.images} badge={product.badge} alt={product.title} />
                        <ProductInfo product={product} />
                    </div>

                    <div className="mt-8">
                        <TrustBadges />
                    </div>

                    <div className="mt-10">
                        <ProductTabs product={product} />
                    </div>
                </Container>
            </div>

            <MinimalFooter />
        </>
    );
};

export default ProductDetailsPage;