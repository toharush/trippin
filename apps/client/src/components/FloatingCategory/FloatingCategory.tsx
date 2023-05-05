import Fab from "@mui/material/Fab";
import "./FloatingCategory.css";

interface FloatingCategoryProps {
  name: string;
  setFilter: Function;
  selected?: boolean;
}

const FloatingCategory = (props: FloatingCategoryProps) => {
  const { name, selected, setFilter } = props;

  const clickFilter = () => {
    setFilter(name);
  };

  return (
    <Fab
      variant="extended"
      onClick={clickFilter}
      className={
        selected
          ? "floatingCategory selectedFloatingCategory"
          : "floatingCategory"
      }
    >
      {name}
    </Fab>
  );
};

export default FloatingCategory;
