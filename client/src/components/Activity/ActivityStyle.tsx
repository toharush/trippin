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
    button: {
        position: 'absolute',
        right: '2% !important',
        top: '5% !important',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#9d9a9a',
        cursor: 'pointer',
    },
    icon: {
        fontSize: '100% !important',

    }
});