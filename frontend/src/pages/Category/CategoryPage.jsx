import {useParams} from "react-router-dom";
import products from "../../data/products.js";

// TODO: اضافه کردن استایل این صفحه برای محصولات

const CategoryPage = () => {
    const {slug} = useParams();

    const categoryProducts = products.filter((product) => product.slug === slug);

    return (
        <main>
            <h1> دسته بندی : {slug}</h1>

            <div className="products-grid">
                {categoryProducts.map((product) => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
export default CategoryPage;