import Category from "../Category/Category";
import "./CategoriesGallery.css";

export default function CategoriesGallery() {
  const categories = [
    "Museums",
    "Night Life",
    "Resturants",
    "Atractions",
    "Shows &Concerts",
    "Shopping",
    "Sport",
    "Nature",
  ];

  return (
    <div className="categories-grid">
      <div className="categories-list">
        {categories.map((category) => (
          <Category name={category}></Category>
        ))}
      </div>
    </div>
  );
}
