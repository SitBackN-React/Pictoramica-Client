import image from 'Image.js'
const stripe = require('stripe')('sk_test_51HobYFEybVIVldfcky1ZlNWny1FvFyRV5pmg6ijHd9hR4jEM58dxUfpLiqpVZC3glcSfeAhryGt221Q47wiHb3br00zqZOL5Vy')
const express = require('express')
const app = express()
app.use(express.static('.'))

const client = 'http://localhost:7165/checkout'

app.post('/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: image.caption,
            images: [image.imageUrl]
          },
          unit_amount: 2000
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${client}?success=true`,
    cancel_url: `${client}?canceled=true`
  })

  res.json({ id: session.id })
})

app.listen(7165, () => console.log('Running on port 7165'))
