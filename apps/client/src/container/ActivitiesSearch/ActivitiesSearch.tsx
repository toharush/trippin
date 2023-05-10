import Search from "../../components/SearchComponent/SearchComponent";
import { useActivities } from "../../hooks";
import { useRef, useEffect } from "react";
import Activity from "../../components/Activity/Activity";
import "./ActivitiesSearch.css";

const ActivitiesSearch = () => {
  const value = useRef<HTMLInputElement>(null);
  const {
    searchActivity,
    searchResults,
    filters,
    selectedActivities,
  } = useActivities();

  const handleActivitySearch = () => {
    console.log(value.current);

    searchActivity(value.current?.value);
  };

  useEffect(() => {
    handleActivitySearch();
  }, [filters, value.current?.value, selectedActivities]);

  return (
    <>
      <Search
        handleSearch={handleActivitySearch}
        title="Search Activities"
        value={value}
      />

      <div className="result scroller">
        {searchResults?.map((activity) => (
          <Activity activity={activity} />
        ))}
      </div>
    </>
  );
};

export default ActivitiesSearch;
