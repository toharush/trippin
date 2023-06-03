import { Divider, CardContent, CardHeader, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface CommentProps {
  username: string;
  text: string;
  date: number;
}

const Comment = (props: CommentProps) => {
  const { date, text, username } = props;
  const newDate = new Date(Number(date)).toDateString();
  return (
    <>
      <CardHeader
        avatar={<AccountCircleIcon className="sidebar-icon" />}
        title={username}
        subheader={newDate}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <Divider />
    </>
  );
};

export default Comment;
