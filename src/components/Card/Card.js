import React from 'react'
import { Link } from 'react-router-dom'
const Card = props => {
  const { name, image, price, _id } = props.product
  return (
    <div style={{ border: 'none', borderRadius: '30px' }} class='card shadow'>
      <img src={image} class='card-img-top' alt='...' />
      <div class='card-body'>
        <h5 class='card-title'>{name}</h5>
        <h6>{price}$</h6>
        <button class='btn btn-warning'>
          <Link
            style={{ color: 'black' }}
            className='card-link-style'
            to={`/checkout/${_id}`}
          >
            Buy Now
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Card
