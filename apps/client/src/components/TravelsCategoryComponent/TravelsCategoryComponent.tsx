import Dropdown from "../Dropdown/Dropdown";
import CategoriesGallery from "../CategoriesGallery/CategoriesGallery";
import { useState } from "react";

interface props {
  isCategoriesOpen: boolean;
  setIsCategoriesOpen: Function;
}
export default function TravelsCategoryComponent({
  isCategoriesOpen,
  setIsCategoriesOpen,
}: props) {
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
