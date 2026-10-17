import Header from "../../components/header/Header.jsx";
import Hero from "../../components/home/hero/Hero.jsx";
import CategoryList from "../../components/home/category/CategoryList.jsx";
import FilterBar from "../../components/home/filterBar/FilterBar.jsx";
import PopularProducts from "../../components/product/products/PopularProducts.jsx";
import NewestProducts from "../../components/product/products/NewestProducts.jsx";
import BestSellingProducts from "../../components/product/products/BestSellingProducts.jsx";
import DiscountedProducts from "../../components/product/products/DiscountedProducts.jsx";
import Benefits from "../../components/home/benefits/Benefits.jsx";
import Footer from "../../components/footer/Footer.jsx";

const Home = () => {
  return (
    <>
        <Header />
        <Hero />
        <CategoryList />
        <FilterBar />
        <PopularProducts />
        <NewestProducts />
        <BestSellingProducts />
        <DiscountedProducts />
        <Benefits />
        <Footer />
    </>
  );
};

export default Home;