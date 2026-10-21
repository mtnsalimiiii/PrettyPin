import Container from "../common/Container.jsx";
import { Link } from "react-router-dom";
import categories from "../../data/categories.js";

const Navbar = () => {
    return (
        <nav className="border-t border-gray-200">
            <Container>
                <ul className="flex h-14 items-center justify-center gap-4 overflow-x-auto whitespace-nowrap lg:gap-10">
                    {categories.map((item) => (
                        <li key={item.id}>
                            <Link to={`/Category/${item.slug}`} className="text-sm font-bold text-black transition hover:text-pink-500">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </nav>
    );
};

export default Navbar;