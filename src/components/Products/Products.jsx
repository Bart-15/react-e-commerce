import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Product from './Product/Product'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import useStyles from './styles'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #21c8ed;
  backgroun-color:red;
`
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
const Products = ({
  products,
  onAddToCart,
  search,
  setFilteredProducts,
  filteredProducts,
}) => {
  const classes = useStyles()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    )
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [search, products])

  const NoProduct = () => {
    return (
      <Grid className={classes.noProduct} container justify='center' spacing={2}>
        <Typography variant='h5'>
          Your search {`"${search}"`} did not match any listings.
        </Typography>
        <Typography variant='subtitle1'>
          Try another search, check if the spelling is correct or try more
          general keywords
        </Typography>
      </Grid>
    )
  }

  if (loading) {
    return (
      <div className={classes.progress}>
        <ClipLoader loading={loading} css={override} size={150} />
      </div>
    )
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}>
        {!filteredProducts.length ? (
          <NoProduct />
        ) : (
          <Grid container justify='center' spacing={4}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </main>
  )
}

export default Products
