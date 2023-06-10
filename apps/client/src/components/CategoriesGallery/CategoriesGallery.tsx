import useUserCategoriesPriority from "../../hooks/useUserCategoriesPriority";
import Category from "../Category/Category";
import "./CategoriesGallery.css";

export default function CategoriesGallery() {

  const {userCategoriesPriority} = useUserCategoriesPriority();


  return (
    <div className="categories-grid">
      <div className="categories-list">
        {userCategoriesPriority.map((category) => (
          <Category name={category.categoryName} value={category.categoryPreference}></Category>
        ))}
      </div>
    </div>
  );
}
