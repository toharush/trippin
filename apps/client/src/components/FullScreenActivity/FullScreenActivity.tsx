import { Chip, Dialog, DialogContent, Divider, Stack } from "@mui/material";
import { Activity } from "../../interfaces";
import Comment from "../Comment/Comment";
import MissingPlaceImage from "../MissingPlaceImage/MissingPlaceImage";
import { useActivities, useAuthentication } from "../../hooks";
import { useTransition, useRef } from "react";
import NewComment from "../Comment/NewComment";

interface FullScreenActivityProps {
  open: boolean;
  setOpen: () => void;
  activity: Activity;
  commetns: any[];
  isSelected: boolean;
}

const FullScreenActivity = (props: FullScreenActivityProps) => {
  const [isPending, startTransition] = useTransition();
  const commentRef = useRef<HTMLInputElement>(null);

  const {
    addSelectedActivity,
    removeSelectedActivity,
    addComment,
    commentPending,
  } = useActivities();

  const { currentUser } = useAuthentication();

  const handleAddSelectedActivity = () => {
    setOpen();
    // @ts-ignore
    startTransition(() => addSelectedActivity(activity));
  };

  const handleRemoveSelectedActivity = () => {
    setOpen();
    // @ts-ignore
    startTransition(() => removeSelectedActivity(activity));
  };

  const handleNewComment = () => {
    if (commentRef.current?.value) {
      addComment(activity.id, commentRef.current.value);
    }
  };

  const { activity, open, setOpen, commetns, isSelected } = props;
  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogContent>
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

        <Stack direction="row" spacing={1} style={{ marginTop: "10px" }}>
          <Chip label={activity.category.name} color="primary" />
          {activity.extra?.categories.map((cat: any) => (
            <Chip label={cat.name} color="success" />
          ))}
        </Stack>

        <Divider
          style={{
            margin: "10px",
          }}
        />

        <NewComment
          commentRef={commentRef}
          loading={commentPending}
          onSubmit={handleNewComment}
          userId={currentUser?.email}
        />

        {commetns.map((comment) => (
          <Comment
            date={comment.date}
            text={comment.text}
            username={comment.username}
            key={comment}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenActivity;
