import product1 from "../assets/images/6.webp";
import product2 from "../assets/images/7.webp";
import product3 from "../assets/images/8.webp";
import product4 from "../assets/images/9.webp";

// نکته: categoryPath و inStock فعلاً دستی نوشته شده‌اند (Mock).
// TODO: بعد از اتصال API واقعی Django، این دو فیلد مستقیماً از پاسخ سرور می‌آیند.
const products = [
  {
    id: "p1",
    title: "کش موی ساتن صورتی",
    price: 259000,
    discountPercent: 0,
    image: product1,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "کش مو", href: "/category/hair-accessories/elastics" },
    ],
  },
  {
    id: "p2",
    title: "گیره سر مرواریددار",
    price: 259000,
    discountPercent: 20,
    image: product2,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "گیره سر", href: "/category/hair-accessories/clips" },
    ],
  },
  {
    id: "p3",
    title: "هدبند مخملی مشکی",
    price: 189000,
    discountPercent: 0,
    image: product3,
    isFavorite: false,
    inStock: false,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "هدبند", href: "/category/hair-accessories/headbands" },
    ],
  },
  {
    id: "p4",
    title: "سنجاق سر طلایی",
    price: 259000,
    discountPercent: 15,
    image: product4,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "سنجاق سر", href: "/category/hair-accessories/pins" },
    ],
  },
  {
    id: "p5",
    title: "کش موی حریر سبز",
    price: 149000,
    discountPercent: 25,
    image: product1,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "کش مو", href: "/category/hair-accessories/elastics" },
    ],
  },
  {
    id: "p6",
    title: "گیره سر خرسی",
    price: 219000,
    discountPercent: 30,
    image: product2,
    isFavorite: false,
    // موقتاً false گذاشته شده تا بتونیم حالت «ناموجود» رو در UI تست کنیم
    inStock: false,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "گیره سر", href: "/category/hair-accessories/clips" },
    ],
  },
  {
    id: "p7",
    title: "هدبند پاپیونی",
    price: 179000,
    discountPercent: 0,
    image: product3,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "هدبند", href: "/category/hair-accessories/headbands" },
    ],
  },
  {
    id: "p8",
    title: "سنجاق سر مرواریدی",
    price: 299000,
    discountPercent: 10,
    image: product4,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "سنجاق سر", href: "/category/hair-accessories/pins" },
    ],
  },
  {
    id: "p9",
    title: "کش موی مخملی بنفش",
    price: 165000,
    discountPercent: 0,
    image: product1,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "کش مو", href: "/category/hair-accessories/elastics" },
    ],
  },
  {
    id: "p10",
    title: "گیره سر فلزی طلایی",
    price: 245000,
    discountPercent: 18,
    image: product2,
    isFavorite: false,
    inStock: true,
    categoryPath: [
      { label: "اکسسوری مو", href: "/category/hair-accessories" },
      { label: "گیره سر", href: "/category/hair-accessories/clips" },
    ],
  },
];

export default products;

// --- بخش جدید: تولید جزئیات کامل برای صفحه جزئیات محصول ---
// این یک راه‌حل موقت است (Enricher). وقتی API واقعی Django وصل شود،
// این فیلدها مستقیماً از پاسخ سرور می‌آیند و این تابع با یک درخواست Axios جایگزین می‌شود.

const DEFAULT_COLORS = [
  { id: "cream", label: "کرم", hex: "#F0E6D6" },
  { id: "pink", label: "صورتی", hex: "#F4A9C4" },
  { id: "mint", label: "سبز کمرنگ", hex: "#A8D8C9" },
  { id: "black", label: "مشکی", hex: "#1A1A1A" },
];

const DEFAULT_SIZES = [{ id: "standard", label: "استاندارد" }];

const galleryPool = [product1, product2, product3, product4];

// محصول ساده صفحه اصلی را با فیلدهای اضافی لازم برای صفحه جزئیات ترکیب می‌کند
export function getProductById(id) {
  const baseProduct = products.find((p) => p.id === id);
  if (!baseProduct) return null;

  return {
    ...baseProduct, // categoryPath و inStock هم از همین‌جا وارد نتیجه نهایی می‌شوند
    badge: baseProduct.discountPercent > 0 ? "تخفیف ویژه" : "پرفروش",
    rating: 5,
    reviewCount: 124,
    shortDescription: `${baseProduct.title} با طراحی شیک و ظریف، انتخابی عالی برای استایل روزمره و مجلسی است.`,
    description: `این ${baseProduct.title} با استفاده از متریال باکیفیت طراحی شده و برای نگه‌داشتن موها با ظرافت و استحکام بالا مناسب است.`,
    images: [baseProduct.image, ...galleryPool.filter((img) => img !== baseProduct.image)],
    colors: DEFAULT_COLORS,
    sizes: DEFAULT_SIZES,
  };
}