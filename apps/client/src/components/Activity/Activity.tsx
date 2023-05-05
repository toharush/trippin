import { Activity as activity } from "../../../../../interfaces";
import "./Activity.css";
import { useActivities } from "../../hooks";
import MissingPlaceImage from "../MissingPlaceImage/MissingPlaceImage";

interface ActivityProps {
  activity: activity;
  isSelected?: boolean;
}

export default function Activity({ activity, isSelected }: ActivityProps) {
  const { addSelectedActivity, removeSelectedActivity } = useActivities();

  const handleAddSelectedActivity = () => {
    addSelectedActivity(activity);
  };

  const handleRemoveSelectedActivity = () => {
    removeSelectedActivity(activity);
  };

  console.log(activity);

  return (
    <div className="max-h-400 md:max-h-none md:max-h-200 flex flex-row bg-white rounded-lg p-4 shadow-lg m-3">
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
  );
}
