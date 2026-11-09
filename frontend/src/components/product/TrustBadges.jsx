import BenefitItem from "../common/BenefitItem.jsx";
import productTrustBadges from "../../data/productTrustBadges.js";

const TrustBadges = () => {
    return (
        <div className="grid grid-cols-1 gap-2 sm:justify-items-center rounded-2xl border border-gray-200 p-5 sm:grid-cols-3">
            {productTrustBadges.map((item) => (
                <BenefitItem key={item.id} icon={item.icon} title={item.title} description={item.description} />
            ))}
        </div>
    );
};

export default TrustBadges;