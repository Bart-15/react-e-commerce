import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import empty from '../../img/empty.svg'
import {Link} from 'react-router-dom'
const Cart = ({ cart, updateCart, removeCart, emptyCart }) => {
  const classes = useStyles()


  const EmptyCart = () => (
    <div className={classes.emptyCart}>
     <img className={classes.emptyImg} src={empty} alt="emptyCart"/>
      <Typography variant='subtitle1'>
        Your shopping cart is empty, <Link to='/'> Shop Now!</Link>
      </Typography>
    </div>
  )
  


  const FilledCart = () => (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem 
              item={item} 
              updateCart={updateCart} 
              removeCart={removeCart}/>
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant='h4'>
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size='large'
              type='button'
              variant='contained'
              color="secondary"
              onClick={() => emptyCart()}
            >
              Empty cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size='large'
              type='button'
              variant='contained'
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
  )
    
  if(!cart.line_items)  return 'loading...'

  return (
    <Container>
      <div className={classes.toolbar}>
        <Typography variant="h3" className={classes.title} gutterBottom>Your shopping cart</Typography>
      </div>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart
