import Container from "../../common/Container.jsx";
import CategoryItem from "./CategoryItem.jsx";
import categories from "../../../data/categories.js";
import {Link} from "react-router-dom";

const CategoryList = () => {
  return (
    <section className="py-8 sm:py-12">
      <Container>
        <div className="flex items-start justify-start gap-6 overflow-x-auto pb-2 sm:justify-center sm:gap-8 sm:overflow-visible sm:pb-0 md:gap-10">
          {categories.map((category) => (
              <Link to={`/Category/${category.slug}`} className="text-sm font-bold text-black transition hover:text-pink-500">
                  <CategoryItem
                      key={category.id}
                      icon={category.icon}
                      label={category.label}
                      bgColor={category.bgColor}
                  />
              </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryList;