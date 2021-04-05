import { makeStyles } from '@material-ui/core/styles'


export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(10),
  },
  root: {
    flexGrow: 1,
  },
  progress: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: '0 auto',
      display: 'flex',
      color: '#21c8ed',
    },
    [theme.breakpoints.up('md')]: {
      
    },
  },
  noProduct: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    padding: '10px',
    height: '90vh',
  },

  searchImg : {
    [theme.breakpoints.down('sm')] : {
      height:'100px'
    },
     [theme.breakpoints.up('md')] : {
      height:'300px'
    }
  }
}))
