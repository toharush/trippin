import { useRef, useTransition, useState } from "react";
import { useDestinations } from "../../hooks";
import { List } from "@mui/material";
import Search from "../../components/SearchComponent/SearchComponent";
import DestinationContainer from "../Destination/Destination";
import { isEmpty } from "lodash";

export default function DestintionsSearch() {
  const [value, setValue] = useState<string>("");
  const [searchResultsDests, setSearchResultsDests] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  const { destinations } = useDestinations();

  const handleSearch = (value: string) => {
    setValue(value);
    startTransition(() => search(value));
  };

  const search = (value: string) => {
    if (value !== "" && !isEmpty(value)) {
      // @ts-ignore
      setSearchResultsDests(
        destinations.filter((dest) =>
          dest.name.toLowerCase().includes(value.toLowerCase())
        ) ?? []
      );
    } else {
      setSearchResultsDests([]);
    }
  };

  return (
    <>
      <Search
        title="Search for destinations .."
        handleSearch={handleSearch}
        // value={value}
      />
      <List
        id="list"
        dense
        sx={{ width: "100%", overflow: "auto", maxHeight: 300 }}
      >
        {searchResultsDests?.map((dest) => (
          <DestinationContainer position={dest?.location} name={dest?.name} />
        ))}
      </List>
    </>
  );
}
