import React from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'

const CartItemDelete = (props) => {
  const { cartItem, cartItemId, user, msgAlert } = props

  const destroy = () => {
    console.log('item deleted')
    console.log(cartItem.item[0])
    console.log(cartItemId)
    axios({
      url: `${apiUrl}/cartItems/${cartItemId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Item Removed',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Remove Item' + error.message,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      <p onClick={destroy} style={{ color: 'black' }}>
        delete
      </p>
    </div>
  )
}

export default CartItemDelete
