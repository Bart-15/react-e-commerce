import React, { useState, useEffect } from 'react'
import { commerce } from './components/lib/commerce'
import { NavBar, Products, Cart, Checkout, Hero, Footer } from './components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css'
const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order,setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  
  

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

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
     try {
       const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
       setOrder(incomingOrder)
       refreshCart()
     } catch (error) {
       setErrorMessage(error.data.error.message)
     }
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  //Hande dark mode

 
  //console debug
  // console.log(cart)


  return (
    <Router>
      <div>
        <NavBar totalItems={cart.total_items} setSearch={setSearch} search={search} />
        <Switch>
          <Route exact path='/'>
            {!search && <Hero />}
            <Products
              products={products}
              onAddToCart={handleAddToCart}
              search={search}
              setFilteredProducts={setFilteredProducts}
              filteredProducts={filteredProducts}
            />
          </Route>
          <Route exact path='/cart'>
            <Cart
              cart={cart}
              updateCart={handleUpdateCart}
              removeCart={handleRemoveCart}
              emptyCart={handleEmpyCart}
            />
          </Route>
          <Route exact path='/checkout'>
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
