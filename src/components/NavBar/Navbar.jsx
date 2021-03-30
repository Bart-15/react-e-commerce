import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../img/logo.jpg'
import useStyles from './style'
const Navbar = () => {
    const classes = useStyles()
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Hopia" height="25px" className={classes.image}/>
                            Hopia
                    </Typography>
                    <div className={classes.growe}>
                        <div className={classes.button}>
                            <IconButton aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={2} color="secondary">
                                    <ShoppingCart></ShoppingCart>
                                </Badge>
                            </IconButton>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
