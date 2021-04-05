import { makeStyles } from '@material-ui/core/styles'


export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root : {
      marginTop:'50px',
    [theme.breakpoints.up('sm')] : {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    }
  },
  emptyImg : {
      height:'300px',
      width:'280px',
      [theme.breakpoints.up('sm')] : {
        height:'500px',
        marginRight:'50px',
        width:'500px'
      }
  },
  sideContainer : {
    marginTop:'5%',
    marginBottom:'5%'
  }
}))