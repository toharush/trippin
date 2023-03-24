import { useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";
import { useStyles } from "./SearchComponentStyle";
import { useActivities } from "../../hooks";
import { Activity as activity} from "../../interfaces";
import Activity from "../Activity/Activity";

interface props {
  title: string;
}

export default function SearchComponent({ title }: props) {
  const [value, setValue] = useState("");
  const [filteredActivities, setFilteredActivies] = useState<activity[] | undefined>([]);
  const { searchActivity, activities } = useActivities();
  const search = useRef();
  const classes = useStyles();

  const handleChangeValue = (e: any) => {
    setValue(e.target.value)
    setFilteredActivies(searchActivity(value));
    console.log(filteredActivities)

  };

  return (
    <div className={classes.conainer}>
      <Autocomplete
        className={classes.search}
        size="small"
        freeSolo
        options={filteredActivities?.map(activity => activity.title) ?? []}
        renderInput={(params) => (
          <TextField
            className={classes.search}
            {...params}
            label={title}
            InputLabelProps={{ style: { color: "gray" } }}
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
            value={value}
            onChange={handleChangeValue}
            // inputRef={search}
          />
        )}
      />
      {filteredActivities?.map(activity => (
        <Activity {...activity} />
      ))}
    </div>
  );
}
