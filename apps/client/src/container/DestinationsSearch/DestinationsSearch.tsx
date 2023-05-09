import { useRef, useEffect } from "react";
import { useDestinations } from "../../hooks";
import SearchComponent from "../../components/SearchComponent/SearchComponent";

interface props {
  title: string;
  searchingDests: boolean;
}
export default function DestintionsSearch({ title, searchingDests }: props) {
  const value = useRef<HTMLInputElement>(null);

  const { searchDestination, searchResultsDests } = useDestinations();

  const handleSearch = () => {
    searchDestination(value?.current?.value);
  };

  useEffect(() => {
    handleSearch();
  }, [value.current?.value]);

  return (
    <SearchComponent
      title={title}
      searchingDests={searchingDests}
      searchResultsDests={searchResultsDests}
      handleSearch={handleSearch}
      value={value}
    />
  );
}
