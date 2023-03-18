import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useStyles } from './SearchComponentStyle';

interface props {
    title: string
}

export default function SearchComponent({title}:props) {

const [value, setValue] = useState<string | null>(null);

const classes = useStyles();

  return (
    <div className={classes.conainer}>
        <Autocomplete className={classes.search}
        size="small"
        freeSolo
        options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
        renderInput={(params) => (
          <TextField className={classes.search}
            {...params}
            label={title}
            InputLabelProps={{ style: { color: 'gray' } }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>   
  );
}