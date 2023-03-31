import { Box, Stack } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Activity as activity } from "../../../../../interfaces";
import Activity from "../Activity/Activity";
import "./ActivitiesGallery.css";
import { MouseEvent, useState } from "react";
import { Button, Popover } from "@mui/material";

interface props {
  selectedActivities: activity[];
  max?: number;
}
export default function ActivitiesGallery({ selectedActivities, max }: props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!max || selectedActivities.length > max) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
      <div className="activities-list">
        {selectedActivities?.map((activity: activity, index) =>
          !max || index < max ? (
            <Activity activity={activity} isSelected />
          ) : null
        )}

        {max && selectedActivities.length > max ? (
          <Button
            aria-describedby={id}
            variant="contained"
            onMouseEnter={handleClick}
            style={{
              width: "20%",
              margin: "auto",
              textAlign: "center"
            }}
          >
            <MoreHorizIcon />
          </Button>
        ) : null}

        <Popover
          PaperProps={{
            style: {
              backgroundColor: "#3e3e3e",
              width: "20%",
              position: "absolute",
              float: "left",
              maxHeight: "45vh",
            },
            onMouseLeave: handleClose,
          }}
          style={{
            top: "21%",
            left: "-34%",
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={open}
        >
          {selectedActivities?.map((activity: activity, index) =>
            max && index >= max ? (
              <Activity activity={activity} isSelected />
            ) : null
          )}
        </Popover>
      </div>
    </Stack>
  );
}
