import { makeStyles } from '@material-ui/core/styles'


export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'20px'
  },
  icon : {
      height:'80px',
      width:'50px',
      cursor:'pointer'
  }
}))