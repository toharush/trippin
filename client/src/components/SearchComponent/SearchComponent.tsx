import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useActivities } from "../../hooks";
import { Activity as activity } from "../../interfaces";
import Activity from "../Activity/Activity";
import "./SearchComponent.css";
interface props {
  title: string;
}

export default function SearchComponent({ title }: props) {
  const [value, setValue] = useState("");
  const [filteredActivities, setFilteredActivies] = useState<
    activity[] | undefined
  >([]);
  const { searchActivity, activities } = useActivities();
  const search = useRef();

  const handleChangeValue = (e: any) => {
    setValue(e.target.value);
    setFilteredActivies(searchActivity(value));
    console.log(filteredActivities);
  };

  return (
    <div className="conainer">
      <Autocomplete
        className="search"
        size="small"
        freeSolo
        options={filteredActivities?.map((activity) => activity.title) ?? []}
        renderInput={(params) => (
          <TextField
            className="search"
            {...params}
            label={title}
            InputLabelProps={{ style: { color: "gray" } }}
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
            value={value}
            onChange={handleChangeValue}
          />
        )}
      />
      {filteredActivities?.map((activity) => (
        <Activity {...activity} />
      ))}
    </div>
  );
}
