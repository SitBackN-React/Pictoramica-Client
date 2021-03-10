import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import CartItemDelete from './CartItemDelete'

import axios from 'axios'
import apiUrl from './../../apiConfig'
// import messages from './../AutoDismissAlert/messages'

const Cart = (props) => {
  const [cart, setCart] = useState([])

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/cartItems`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setCart(res.data.cartItems)
        console.log(res)
      })
      .then(() => msgAlert({
        heading: 'Showing all of the items in your cart',
        variant: 'primary'
      }))
      .catch(error => {
        setCart([])
        msgAlert({
          heading: 'Failed to show the items in your cart ' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  if (cart.length > 0) {
    console.log(cart)
    console.log(cart[0])
    console.log(cart[0].createdAt)
    console.log(cart[0].item)
    console.log(cart[0].item[0])
    console.log(cart[0].item[0].caption)
  }

  const cartJsx = cart.map(cartItem => (
    <div key={cartItem._id} style={{ backgroundColor: 'white', margin: '10px', borderRadius: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px', color: 'black' }} >
        <Link to={`/images/${cartItem.item[0]._id}`} style={{ marginRight: '10px' }}>
          <img src={cartItem.item[0].imageUrl} style={{ width: '150px', height: '150px', border: '2px solid black', borderRadius: '20px' }} />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'black' }}>
          <Link to={`/images/${cartItem.item[0]._id}`} style={{ color: 'black' }}>
            <h4>{cartItem.item[0].caption}</h4>
          </Link>
          <CartItemDelete
            cartItem={cartItem}
            cartItemId={cartItem._id}
            {...props}
          />
        </div>
      </div>
      <div>
        <p>{cartItem.item[0].price}</p>
      </div>
    </div>
  ))

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
        {(cart.length > 0) ? cartJsx : <div>No items in your cart</div>}
      </div>
      <Checkout
        // src={image.imageUrl}
        // alt={image.caption}
        {...props}
        user={props.user}
      />
    </div>
  )
}

export default Cart
