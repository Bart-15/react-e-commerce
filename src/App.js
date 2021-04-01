import React, { useState, useEffect } from 'react'
import { commerce } from './components/lib/commerce'
import { NavBar, Products, Cart, Checkout } from './components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  //Fetch all the products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  //Fetch all the cart item
  const fetchCart = async () => {
    const response = await commerce.cart.retrieve()
    setCart(response)
  }
  //Add to cart function
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    alert('Added')
    setCart(item.cart)
  }
  //Update Cart
  const handleUpdateCart = async (productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity})

    setCart(cart)
  }

  //Remove from cart
  const handleRemoveCart  = async (productId) => {
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart)
  }

  //Empty cart
  const handleEmpyCart = async () => {
    const {cart} = await commerce.cart.empty()

    setCart(cart);
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  //console debug
  console.log(cart)

  return (
    <Router>
      <div>
        <NavBar totalItems={cart.total_items} />
        <Switch>
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path='/cart'>
            <Cart
              cart={cart}
              updateCart={handleUpdateCart}
              removeCart={handleRemoveCart}
              emptyCart={handleEmpyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
