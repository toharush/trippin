import { useRef, useEffect } from "react";
import { useDestinations } from "../../hooks";
import { List } from "@mui/material";
import Destination from "../../components/Destination/Destination";
import Search from "../../components/SearchComponent/SearchComponent";

export default function DestintionsSearch() {
  const value = useRef<HTMLInputElement>(null);

  const { searchDestination, searchResultsDests } = useDestinations();

  const handleSearch = () => {
    searchDestination(value?.current?.value);
  };

  useEffect(() => {
    handleSearch();
  }, [value.current?.value]);

  return (
    <>
      <Search
        title="Search for destinations .."
        handleSearch={handleSearch}
        value={value}
      />
      <List
        id="list"
        dense
        sx={{ width: "100%", overflow: "auto", maxHeight: 300 }}
      >
        {searchResultsDests.map((dest) => (
          <Destination position={dest?.location} name={dest?.name} />
        ))}
      </List>
    </>
  );
}
