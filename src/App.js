import React, {useState, useEffect} from 'react'
import {commerce} from './components/lib/commerce'
import {NavBar, Products} from './components'
const App = () => {
const [product, setProducts] = useState([])

const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
}

useEffect(() => {
    fetchProducts()
}, [])

console.log(product)
    return (
        <div>
            <NavBar />
            <Products />  
        </div>
    )
}

export default App
  