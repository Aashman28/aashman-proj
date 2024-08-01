import React from 'react'
import {Card, CardBody, CardText} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link  to={`/product/${product._id}`}>
      <Card.Img src={product.image} variant='top'></Card.Img>
      </Link>

      <CardBody>
        <Link to={`/product/${product._id}`}>
        <Card.Title as="div"></Card.Title>
        <strong>{product.name}</strong>
        </Link>

        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>

        <CardText as="h3">
          ${product.price}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default Product