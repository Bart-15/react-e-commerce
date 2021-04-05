import React, { useState, useEffect } from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import FormInput from './FormInput'
import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../lib/commerce'
import {Link} from 'react-router-dom'
const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm()

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState()

  //console.log(shippingOptions)
  //fetch shipping countries
  const fetchShippingCountries = async (checkouTokenId) => {
    const {countries} =  await commerce.services.localeListShippingCountries(checkouTokenId)
     
    // console.log(countries)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0]);
  }

  //fecth shipping subdivisions
  const fetchShippingSubdivisions = async (countryCode) => {
      const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
      setShippingSubdivisions(subdivisions)
      setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  //fetch shipping options
  const fetchShippingOptions = async (checkouTokenId, country, stateProvince = null) =>{
      const options = await commerce.checkout.getShippingOptions(checkouTokenId,{country, region:stateProvince});
      setShippingOptions(options) 
      setShippingOption(options[0].id);
  }


  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if(shippingCountry) fetchShippingSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  console.log(shippingCountries)
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}) )}>
          <Grid container spacing={3}>
            <FormInput name='firstName' label='First name' />
            <FormInput name='lastName' label='Last name' />
            <FormInput name='address1' label='Address' />
            <FormInput name='email' label='Email' />
            <FormInput name='city' label='City' />
            <FormInput name='zip' label='Zip / Postal code' />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
                fullWidth
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Select Region</InputLabel>
              <Select
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
                fullWidth
              >
                {Object.entries(shippingSubdivisions)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
                fullWidth
              >
                {shippingOptions
                  .map((shipOp) => ({
                    id: shipOp.id,
                    label: `${shipOp.description} - (${shipOp.price.formatted_with_symbol})`,
                  }))
                  .map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} to="/cart" variant='outlined'>Back to cart</Button>
          <Button type="submit" variant='contained' color="primary">Next Step</Button>
        </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
