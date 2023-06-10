import { Slider } from "@mui/material";
import {
  Nightlife as NightlifeIcon,
  Museum as MuseumIcon,
  Attractions as AttractionsIcon,
  Fastfood as FastfoodIcon,
  SportsBasketball as SportsBasketballIcon,
  LocalMall as LocalMallIcon,
  Forest as ForestIcon,
  TheaterComedy as TheaterComedyIcon,
} from "@mui/icons-material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Stack } from "@mui/system";
import "./Category.css";
import useUserCategoriesPriority from "../../hooks/useUserCategoriesPriority";
import { ChangeEvent, SyntheticEvent, useEffect } from 'react';

interface props {
  name: string;
  value:number;
}

interface MyObject {
  [key: string]: JSX.Element;
}

const iconMapping: MyObject = {
  Museums: <MuseumIcon />,
  "Night Life": <NightlifeIcon />,
  Resturants: <FastfoodIcon />,
  Atractions: <AttractionsIcon />,
  Shows: <TheaterComedyIcon />,
  Shopping: <LocalMallIcon />,
  Sport: <SportsBasketballIcon />,
  Nature: <ForestIcon />,
};

export default function Category({name,value}: props) {

  const {userCategoriesPriority ,setCategoriesPriority} = useUserCategoriesPriority();

  const handleSliderChange = (event: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    setCategoriesPriority(name,newValue as number);
  };


  function valuetext(value: number) {
    return `${value}`;
  }

  const IconComponent = iconMapping[name];

  return (
    <div className="category-root">
      <Grid container spacing={3}>
        <Grid xs={2} sm={1} md={2}>
          <Stack spacing={4}>
            <div className="category-icon">{IconComponent}</div>
            <text className="category-name">{name}</text>
          </Stack>
        </Grid>
        <Grid xs={8} sm={9} md={8}>
          <Slider
            aria-label="Temperature"
            defaultValue={value}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            sx={{
              color: "#86EAF0",
            }}
            onChangeCommitted={(event, newVal)=>handleSliderChange(event,newVal)}
          />
        </Grid>
      </Grid>
    </div>
  );
}
