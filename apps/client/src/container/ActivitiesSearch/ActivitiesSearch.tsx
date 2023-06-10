import Search from "../../components/SearchComponent/SearchComponent";
import { useActivities } from "../../hooks";
import { useTransition, useState, useEffect } from "react";
import Activity from "../../components/Activity/Activity";
import "./ActivitiesSearch.css";
import { isEmpty, filter, differenceBy } from "lodash";
import { Activity as IActivity } from "../../interfaces";

const ActivitiesSearch = () => {
  const [isPending, startTransition] = useTransition();
  const [searchRes, setSearchRes] = useState<IActivity[]>([]);
  const [value, setValue] = useState("");
  const { filters, selectedActivities, activities } = useActivities();

  const search = (value: string) => {
    if (value !== "" && !isEmpty(value)) {
      const filteredItems = filter(
        differenceBy(activities, selectedActivities, "id"),
        (activity) =>
          (isEmpty(filters.category) ||
            activity.category.name
              ?.toLowerCase()
              .includes(filters.category!)) &&
          activity.title.toLowerCase().includes(value.toLowerCase())
      );
      //@ts-ignore
      setSearchRes(filteredItems);
    } else {
      setSearchRes([]);
    }
  };

  const handleActivitySearch = (value: string) => {
    setValue(value);
    startTransition(() => {
      search(value);
    });
  };

  useEffect(() => {
    handleActivitySearch(value);
  }, [filters, selectedActivities]);

  return (
    <>
      <Search
        handleSearch={handleActivitySearch}
        title="Search for activities"
      />

      <div className="result scroller">
        {searchRes?.map((activity) => (
          <Activity activity={activity} />
        ))}
      </div>
    </>
  );
};

export default ActivitiesSearch;
