import FloatingCategory from "../../components/FloatingCategory/FloatingCategory";
import { useActivities } from "../../hooks";
import "./FloatingCategories.css";

const FloatingCategories = () => {
  const { setFilter, filters } = useActivities();
  const categories = ["restaurant", "bar"];

  return (
    <div className="categoryControl">
      {categories.map((category) => (
        <FloatingCategory
          name={category}
          setFilter={() => {
            setFilter(category);
          }}
          selected={filters.category === category}
        />
      ))}
    </div>
  );
};

export default FloatingCategories;
