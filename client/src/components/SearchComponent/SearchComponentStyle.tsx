import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    conainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%',
    },
    search: {
        width:"70%",
        backgroundColor:"white",
        borderRadius:8,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#34d2eb',
              borderWidth: '2px'
            },
            '& input': {
                color: '#282828', // change this value to adjust the text color
              },
        }}
    
});