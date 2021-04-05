import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core'
import useStyles from './styles'
import { PaymentForm, AddressForm } from '../../index'
import { commerce } from '../../lib/commerce'
import { Link, useHistory } from 'react-router-dom'
const steps = ['Shipping address', 'Payment Details']
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const [finish, isFinished] = useState(false)
  const history = useHistory();

  //get the token id
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        })
        setCheckoutToken(token)
        console.log(token)
      } catch (error) {
        history.push('/')
      }
    }

    generateToken()
  }, [cart])

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const next = (data) => {
    setShippingData(data)
    nextStep()
  }

  const timeout = () => {
    setTimeout(() => {
      isFinished(true)
    }, 3000)
  }

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.customer.firstname}{' '}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </>
    ) : isFinished ? (
      <div>
        <Typography variant='h5'>Thank you for your purchase</Typography>
        <Divider className={classes.divider} />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </div>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    )

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant='h5'>Error: {error}</Typography>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </>
    )
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        next={next}
        nextStep={nextStep}
      />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeout={timeout}
      />
    )

  // console.log(shippingData)
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant='h4' align='center'>
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep >= steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </div>
    </>
  )
}

export default Checkout
