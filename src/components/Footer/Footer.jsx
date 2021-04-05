import React from 'react'
import {Container, Typography} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import useStyles from './styles'
const Footer = () => {
    const classes = useStyles();
    return (
      <Container className={classes.root}>
        <FacebookIcon color='primary' className={classes.icon} />
        <GitHubIcon className={classes.icon} />
        <LinkedInIcon className={classes.icon} color="primary"></LinkedInIcon>
        <Typography variant="subtitle1">Bart Tabusao</Typography>
      </Container>
    )
}

export default Footer
