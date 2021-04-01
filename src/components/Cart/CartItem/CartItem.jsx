import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core'

import useStyles from './styles'
const CartItem = ({item, updateCart, removeCart}) => {
    const classes = useStyles();

    console.log(item.quantity);
    return (
      <Card>
        <CardMedia
          className={classes.media}
          image={item.media.source}
          title={item.name}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography gutterBottom variant='h6'>
              {item.name}
            </Typography>
            <Typography gutterBottom variant='h6'>
              {item.price.formatted_with_symbol}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button type='button' size='small' onClick={() => updateCart(item.id, item.quantity - 1)}>
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button type='button' size='small' onClick={() => updateCart(item.id, item.quantity + 1)}>
              +
            </Button>
          </div>
          <Button variant="contained" type="button" color="secondary" onClick={() => removeCart(item.id)}>Remove</Button>
        </CardActions>
      </Card>
    )
}

export default CartItem
