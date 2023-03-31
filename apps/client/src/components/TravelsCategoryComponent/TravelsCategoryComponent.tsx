import Dropdown from "../Dropdown/Dropdown";
import CategoriesGallery from "../CategoriesGallery/CategoriesGallery";
import { useState } from "react";

export default function TravelsCategoryComponent() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const handleCategoriesClick = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const categoriesTitle = "Travel's Categories";

  return (
    <>
      <Dropdown
        handleClick={handleCategoriesClick}
        isCategoryOpen={isCategoriesOpen}
        title={categoriesTitle}
      ></Dropdown>
      {isCategoriesOpen && <CategoriesGallery />}
    </>
  );
}
