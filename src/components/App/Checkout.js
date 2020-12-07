import React, { useState, useEffect } from 'react'
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import image from 'Image.js'

// const CheckoutForm = () => {
//   const stripe = useStripe()
//   const elements = useElements()
//
//   const handleSubmit = async (event) => {
//     // Block native form submission
//     event.preventDefault()
//
//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded
//       return
//     }
//
//     // Get a reference to a mounted CardElement.
//     const cardElement = elements.getElement(CardElement)
//
//     // Use your card Element with other Stripe.js APIs
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement
//     })
//
//     if (error) {
//       console.log('[error], error')
//     } else {
//       console.log('[PaymentMethod]', paymentMethod)
//     }
//   }
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4'
//               }
//             },
//             invalid: {
//               color: '#9e2146'
//             }
//           }
//         }}
//       />
//       <button type="submit" disable={!stripe}>
//           Pay
//       </button>
//     </form>
//   )
// }

// Call 'loadStripe' outside of the component's render to avoid recreating 'Stripe'
// object on every render
const stripePromise = loadStripe('pk_test_51HobYFEybVIVldfc4QmD3NhroakMWJARBgzjLHf5tKx76TBTEmdcgnHrNFGujESH43KIdVM8xDur1JSCtaHqkQan00qUaWN889')

const ProductDisplay = ({ handleClick }) => (
  <section>
    <div className="product">
      <img
        src={image.imageUrl}
        alt={image.caption}
      />
      <div className="description">
        <h3>image.caption</h3>
        <h5>[amount]</h5>
      </div>
    </div>
    <button id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
  </section>
)

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function Application () {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])

  const handleClick = async (event) => {
    const stripe = await stripePromise

    const response = await fetch('/create-session', {
      method: 'POST'
    })

    const session = await response.json()

    // When the customer clicks on the button, redirect them to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`
    }
  }

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  )
}
