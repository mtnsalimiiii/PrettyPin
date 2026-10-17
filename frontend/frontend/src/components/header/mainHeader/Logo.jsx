import logo from "../../../assets/images/5.webp";
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <span className="text-4xl font-bold text-black sm:text-4xl">زیبانو</span>
            <img src={logo} alt="PrettyPin" className="h-10 w-auto sm:h-10"/>
        </Link>
    );
};

export default Logo;