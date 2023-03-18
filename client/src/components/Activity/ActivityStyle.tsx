import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    row: {
        marginLeft: '5%',
        marginBottom: '5%',
        backgroundColor: 'white',
        borderRadius: '10px',
        height: '13vh',
        position: 'relative',
    },
    img: {
        position: 'absolute',
        height: '100%',
        width: '33%',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
    },
    text: {
        position: 'absolute',
        color: '#3E3E3E',
        fontSize: '75%',
        paddingLeft: '3%',
        bottom: '0',
    },
    icon: {
        position: 'absolute',
        right: '2%',
        top: '1%',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#9d9a9a',
        fontSize: '30',
        cursor: 'pointer',
    }
});