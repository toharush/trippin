import { Avatar, CardContent, CardHeader, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface CommentProps {
  username: string;
  text: string;
  date: number;
}

const Comment = (props: CommentProps) => {
  const { date, text, username } = props;

  return (
    <>
      <CardHeader
        avatar={<AccountCircleIcon className="sidebar-icon" />}
        title={username}
        subheader={ new Date(date).toDateString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </>
  );
};

export default Comment;