import { Heart, ShoppingBag } from "lucide-react";
import IconButton from "../../common/IconButton.jsx";
import AccountMenu from "./AccountMenu.jsx";
import { useCart } from "../../../context/CartContext.jsx";

const HeaderActions = ({ mobile = false }) => {
    const { totalCount } = useCart();

    return (
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
            <IconButton label="سبد خرید" badgeCount={totalCount}>
                <ShoppingBag size={20} />
            </IconButton>

            {!mobile && (
                <>
                    <IconButton label="علاقه‌مندی‌ها">
                        <Heart size={20} />
                    </IconButton>

                    <AccountMenu />
                </>
            )}
        </div>
    );
};

export default HeaderActions;