import { Activity as activity } from "../../interfaces/activity/activity";
import "./Activity.css";
import { Rating } from "@mui/material";
import { useState } from "react";
import { useActivities, useStepper } from "../../hooks";
import MissingPlaceImage from "../MissingPlaceImage/MissingPlaceImage";
import FullScreenActivity from "../FullScreenActivity/FullScreenActivity";
import { stepperValues } from "../../interfaces";

interface ActivityProps {
  activity: activity;
  isSelected?: boolean;
  minimized?: boolean;
}

export default function Activity({
  activity,
  isSelected,
  minimized,
}: ActivityProps) {
  const [showMore, setShowMore] = useState(false);
  const { addSelectedActivity, removeSelectedActivity } = useActivities();
  const {currentStep} = useStepper();

  const handleAddSelectedActivity = () => {
    addSelectedActivity(activity);
  };

  const handleRemoveSelectedActivity = () => {
    removeSelectedActivity(activity);
  };

  return (
    <div className={minimized ? "" : "bg-white rounded-lg p-4 shadow-lg m-3"}>
      <div className="flex flex-row max-h-400 md:max-h-none md:max-h-200">
        <div className="w-1/3">
          {Boolean(activity?.google?.image_url) ? (
            <img
              src={activity.google.image_url}
              alt={activity.title}
              className="h-full w-full object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <MissingPlaceImage label={activity.title} />
          )}
        </div>

        <div className="flex flex-col justify-between ml-4 w-2/3">
          <div>
            <h2 className="text-xl font-semibold">{activity.title}</h2>

            <p className="text-gray-500 mt-2">
              {activity.category.name}{" "}
              {activity.extra?.categories
                .filter((cat: any) => cat.name != activity.category.name)
                .map((cat: any) => (
                  <>&bull; {cat.name} </>
                ))}
            </p>
          </div>
          { currentStep !=  stepperValues.Results && 
          <button
            className="bg-main text-white font-bold py-2 px-4 rounded"
            style={{ marginBottom: "5px" }}
            onClick={
              isSelected
                ? handleRemoveSelectedActivity
                : handleAddSelectedActivity
            }
          >
            {isSelected ? `Remove` : `Add`}
          </button>}
          <button onClick={() => setShowMore(true)}>Show More</button>
        </div>
      </div>

      {showMore ? (
        <FullScreenActivity
          activity={activity}
          open={showMore}
          setOpen={() => setShowMore(!showMore)}
          isSelected={isSelected ?? false}
        />
      ) : null}
    </div>
  );
}
