import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Divider,
} from "@mui/material";
import Loader from "../loader/Loader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface NewCommentProps {
  userId?: string | null;
  loading: boolean;
  commentRef: React.RefObject<HTMLInputElement> | undefined;
  onSubmit: () => void;
}
const NewComment = (props: NewCommentProps) => {
  const { commentRef, loading, onSubmit, userId } = props;
  return userId ? (
    !loading ? (
      <>
        <CardHeader
          avatar={<AccountCircleIcon className="sidebar-icon" />}
          title="Me"
          subheader={new Date().toDateString()}
        />
        <CardContent>
          <TextField
            variant="outlined"
            label="comment"
            fullWidth
            inputRef={commentRef}
          />
        </CardContent>
        <CardActions>
          <Button onClick={onSubmit} type="submit">
            Send
          </Button>
        </CardActions>
        <Divider />
      </>
    ) : (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-around",
        }}
      >
        <Loader isBlack={true} />
      </div>
    )
  ) : null;
};

export default NewComment;
