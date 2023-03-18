import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    sidebar: {
      height:'100vh',
      backgroundColor:'#3E3E3E',
      position:'relative'
    },
    login: {
      color:'#86EAF0',
      padding:'2%',
      position:'relative',
      cursor: 'pointer',
    },
    icon: {
      fontSize:'30',
    },
    logo: {
      textAlign:'center',
      position: 'absolute',
      bottom:0
    },
    text: {
      position:'absolute',
      marginInline:'1%'
    },
    img: {
      width:'35%',
      height:'auto'
    }
  });