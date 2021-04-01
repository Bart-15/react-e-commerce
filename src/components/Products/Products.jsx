import React from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'

// const products = [
//   {
//     id: 1,
//     name: 'Kettle',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, itaque.',
//     price: 'Php 100',
//     image:
//       'https://www.ikea.com/jp/en/images/products/vattentaet-kettle-stainless-steel-black__0713344_pe729450_s5.jpg?f=xs',
//   },
//   {
//     id: 2,
//     name: 'Shoes',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, itaque.',
//     price: 'Php 50',
//     image:
//       'https://assetscdn1.paytm.com/images/catalog/product/F/FO/FOOHEEDERIN-MENMAYA797997E1C70E80/0..jpg',
//   },
//   {
//     id: 3,
//     name: 'Plate',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, itaque.',
//     price: 'Php 20',
//     image: 'https://cb2.scene7.com/is/image/CB2/CrispMatteBlackRndDnnrPltSHS18',
//   },
// ]
const Products = ({products, onAddToCart}) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}>
        <Grid container justify='center' spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  )
}

export default Products
