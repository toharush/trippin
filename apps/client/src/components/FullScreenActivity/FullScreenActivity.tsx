import {
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Activity, stepperValues } from "../../interfaces";
import Comment from "../Comment/Comment";
import MissingPlaceImage from "../MissingPlaceImage/MissingPlaceImage";
import { useActivities, useAuthentication, useStepper } from "../../hooks";
import { useTransition, useRef, useEffect, useState } from "react";
import NewComment from "../Comment/NewComment";
import { getCommentsByPlaceId } from "../../services";
import IComment from "../../interfaces/comment/comment";

interface FullScreenActivityProps {
  open: boolean;
  setOpen: () => void;
  activity: Activity;
  isSelected: boolean;
}

const FullScreenActivity = (props: FullScreenActivityProps) => {
  const [isPending, startTransition] = useTransition();
  const commentRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const { activity, open, setOpen, isSelected } = props;
  const {
    addSelectedActivity,
    removeSelectedActivity,
    addComment,
    commentPending,
  } = useActivities();

  const { currentUser } = useAuthentication();
  const { currentStep } = useStepper();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setComments(await getCommentsByPlaceId(activity.id));
  };

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

  const handleNewComment = async () => {
    if (commentRef.current?.value) {
      await addComment(activity.id, commentRef.current.value);
      await fetchComments();
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} fullWidth>
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
              {activity.google?.rate ? (
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h2>{activity.google?.rate} </h2>&bull;
                  <Rating
                    style={{ pointerEvents: "none" }}
                    value={Number(activity.google!.rate)}
                    title={`${activity.google?.rate}`}
                  />
                </div>
              ) : null}
              <Stack
                direction="row"
                spacing={1}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Chip label={activity.category.name} color="primary" />
                {activity.extra?.categories
                  .filter((cat: any) => cat.name != activity.category.name)
                  .map((cat: any) => (
                    <Chip label={cat.name} color="success" />
                  ))}
              </Stack>
            </div>
            {currentStep != stepperValues.Results && (
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
            )}
          </div>
        </div>

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

        {comments.map((comment) => (
          <Comment
            date={comment.date}
            text={comment.text}
            username={comment.user_id}
            key={comment.id}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenActivity;
