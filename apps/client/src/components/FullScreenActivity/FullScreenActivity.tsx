import { Chip, Dialog, DialogContent, Divider, Stack } from "@mui/material";
import { Activity } from "../../interfaces";
import Comment from "../Comment/Comment";
import MissingPlaceImage from "../MissingPlaceImage/MissingPlaceImage";
import { useActivities, useAuthentication } from "../../hooks";
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

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setComments(await getCommentsByPlaceId(activity.id));
  };

  const {
    addSelectedActivity,
    removeSelectedActivity,
    addComment,
    commentPending,
  } = useActivities();

  const { activity, open, setOpen, isSelected } = props;

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
