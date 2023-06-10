import Box from "@mui/joy/Box";
import FloatingCategory from "../../components/FloatingCategory/FloatingCategory";
import { useActivities } from "../../hooks";
import "./FloatingCategories.css";

const FloatingCategories = () => {
  const { setFilter, filters } = useActivities();
  const categories = ["restaurant", "bar", "museum", "night club"];

  return (
    <Box sx={{ "& > :not(style)": { marginTop: 1.5 } }}>
      {categories.map((category) => (
        <FloatingCategory
          name={category}
          setFilter={() => {
            setFilter(category);
          }}
          selected={filters.category === category}
        />
      ))}
    </Box>
  );
};

export default FloatingCategories;
