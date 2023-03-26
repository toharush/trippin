import { makeStyles } from "@material-ui/styles";
import { borderColor } from "@mui/system";

export const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
          },
          '& .MuiPickersDay-daySelected': {
            backgroundColor: 'white',
            color: 'black',
          },
          '& .MuiSvgIcon-root': {
            fill: 'white',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
            borderWidth: '2px',
          },
        }
});