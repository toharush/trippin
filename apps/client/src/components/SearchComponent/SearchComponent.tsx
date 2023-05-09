import { useRef, useEffect, Ref, ForwardedRef } from "react";
import { useActivities, useDestinations } from "../../hooks";
import Activity from "../Activity/Activity";
import Destination from "../Destination/Destination";
import "./SearchComponent.css";
import List from "@mui/material/List";

interface props {
  title: string;
  searchingDests: boolean;
  handleSearch: () => void;
  searchResultsDests: any[];
  value: React.RefObject<HTMLInputElement>;
}
export default function SearchComponent({
  title,
  searchingDests,
  handleSearch,
  searchResultsDests,
  value,
}: props) {
  const {
    searchActivity,
    searchResults,
    filters,
    selectedActivities,
  } = useActivities();

  const handleActivitySearch = () => {
    searchActivity(value?.current?.value);
  };

  useEffect(() => {
    handleActivitySearch();
  }, [filters, value.current?.value, selectedActivities]);

  return (
    <>
      <form className="group relative mx-3 mt-3">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          aria-label="Filter projects"
          placeholder={title}
          ref={value}
          onChange={!searchingDests ? handleActivitySearch : handleSearch}
        />
      </form>
      {!searchingDests ? (
        <div className="result scroller">
          {searchResults?.map((activity) => (
            <Activity activity={activity} />
          ))}
        </div>
      ) : (
        <List
          id="list"
          dense
          sx={{ width: "100%", overflow: "auto", maxHeight: 300 }}
        >
          {searchResultsDests.map((dest) => (
            <Destination
              position={dest?.location}
              name={dest?.name}
            ></Destination>
          ))}
        </List>
      )}
    </>
  );
}
