import { useEffect, useTransition, useState } from "react";
import { useDestinations } from "../../hooks";
import { List } from "@mui/material";
import Search from "../../components/SearchComponent/SearchComponent";
import DestinationContainer from "../Destination/Destination";
import { filter, isEmpty } from "lodash";

export default function DestintionsSearch() {
  const [searchResultsDests, setSearchResultsDests] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const {
    destinations,
    selectedDestination,
    setSelectedDestination,
    resetSelectedDestination,
  } = useDestinations();
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    startTransition(() => search(value));
    resetSelectedDestination();
    setShowResults(true);
  };

  const search = (value: string) => {
    if (value !== "" && !isEmpty(value)) {
      setSearchResultsDests(
        filter(destinations, (dest) =>
          dest?.name?.toLowerCase().includes(value?.toLowerCase())
        ) ?? []
      );
    } else {
      setSearchResultsDests([]);
    }
  };

  useEffect(() => {
    if (selectedDestination) {
      setShowResults(false);
    }
  }, [selectedDestination]);

  return (
    <>
      <Search
        title="Search for destinations .."
        handleSearch={handleSearch}
        value={selectedDestination.name}
        textColor="white"
      />
      {showResults && (
        <List
          id="list"
          dense
          sx={{ width: "30%", overflow: "auto", maxHeight: 300, zIndex:9999, position:"absolute"}}
        >
          {searchResultsDests?.map((dest) => (
            <DestinationContainer position={dest?.location} name={dest?.name} />
          ))}
        </List>
      )}
    </>
  );
}
