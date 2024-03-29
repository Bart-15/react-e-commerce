import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    [theme.breakpoints.down('sm')] : {
      marginTop:'20%'
    },
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
  emptyCart : {
    [theme.breakpoints.up('md')] : {
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      fontSize:'30px'
    }
  },
  emptyImg : {
    height:'500px',
    [theme.breakpoints.down('sm')] : {
      height:'300px'
    }
  }
}))
