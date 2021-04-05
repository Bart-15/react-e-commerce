import React from 'react'
import{Container, Typography, Button} from '@material-ui/core'
import onlineShopping from '../../img/online_shopping.svg'
import useStyles from './styles'
const Hero = () => {

    const classes = useStyles();
    return (
       <Container className={classes.root}>
           <img src={onlineShopping} alt="" className={classes.emptyImg}/>
           <div className={classes.sideContainer}>
               <Typography variant="h4">Online Shopping</Typography>
               <Typography variant="subtitle1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi amet natus debitis praesentium at aperiam dolor molestiae sit provident facilis.</Typography>
               <Button variant="contained" color="primary">Shop Now</Button>
           </div>
       </Container> 
    )
}

export default Hero
