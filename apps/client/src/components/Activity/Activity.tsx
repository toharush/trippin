import { Activity as activity } from "../../../../../interfaces";
import "./Activity.css";
import { useState } from "react";
import { useActivities } from "../../hooks";
import MissingPlaceImage from "../MissingPlaceImage/MissingPlaceImage";
import Comment from "../Comment/Comment";
import FullScreenActivity from "../FullScreenActivity/FullScreenActivity";

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
  const {
    addSelectedActivity,
    removeSelectedActivity,
    addComment,
  } = useActivities();

  const handleAddSelectedActivity = () => {
    addSelectedActivity(activity);
  };

  const handleRemoveSelectedActivity = () => {
    removeSelectedActivity(activity);
  };

  return (
    <div className={minimized ? "" : "bg-white rounded-lg p-4 shadow-lg m-3"} onClick={() => setShowMore(true)}>
      <div className="flex flex-row max-h-400 md:max-h-none md:max-h-200">
        <div className="w-1/3">
          {Boolean(activity?.google?.image_url) ? (
            <img
              src={activity.google.image_url}
              alt={activity.title}
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <MissingPlaceImage label={activity.title} />
          )}
        </div>

        <div className="flex flex-col justify-between ml-4 w-2/3">
          <div>
            <h2 className="text-xl font-semibold">{activity.title}</h2>
            <p className="text-gray-500 mt-2">{activity.category?.name}</p>
          </div>
          <button
            className="bg-main text-white font-bold py-2 px-4 rounded"
            style={{marginBottom: "5px"}}
            onClick={
              isSelected
                ? handleRemoveSelectedActivity
                : handleAddSelectedActivity
            }
          >
            {isSelected ? `Remove` : `Add`}
          </button>
    
        </div>
      </div>

      {showMore ? (
        <FullScreenActivity
          activity={activity}
          commetns={[
            {
              date: new Date(),
              text: "test",
              username: "tohar@gmail.com",
            },
          ]}
          open={showMore}
          setOpen={() => setShowMore(!showMore)}
          isSelected={isSelected ?? false}
        />
      ) : // <Comment date={new Date()} text="test" username="tohar@gmail.com" />
      null}
    </div>
  );
}
