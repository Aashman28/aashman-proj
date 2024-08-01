import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {Form,Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice'
import {addToCart} from '../slices/cartSlice'

const ProductScreen = () => {
 
  const {id: productId} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty,setQty] = useState(1);

  
  
  const {data:product,isLoading,error} = useGetProductsDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({...product,qty}));
    navigate('/cart');
  }

  return (
    <>
      <Link className='btn btn-light py-3' to='/'>
       Go Back
      </Link>

      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <div>
          {error?.data?.message || error.error}
        </div>
      ) : (
        <Row>
        <Col md ={5}>
        <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md ={4}>
        <ListGroup>
          <ListGroupItem>
            <h3>{product.name}</h3>
          </ListGroupItem>
          <ListGroupItem>
            <Rating 
             value={product.rating} text={`${product.numReviews}reviews`}/>
          </ListGroupItem>
          <ListGroupItem>
            Price = ${product.price}
          </ListGroupItem>
          <ListGroupItem>
              Description : {product.description} 
            </ListGroupItem>
        </ListGroup>
        </Col>
        <Col md = {3}>
        <Card>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>Price:</Col>
                <Col><strong>${product.price}</strong></Col>
              </Row>
            </ListGroupItem>
           

            <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col><strong>{product.countInStock > 0 ? 'In Stock' :'Out of Stock'}</strong></Col>
              </Row>
            </ListGroupItem>

            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                  <Form.Control
                  as='select'
                  value={qty}
                  onChange={(e)=>setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x)=>(
                      <option key={x+1} value={x+1}>
                        {x+1}
                      </option>
                    ))}
                  </Form.Control>
                  
                  </Col>
                </Row>


              </ListGroupItem>)}

            <ListGroupItem>
              <Button
              className='btn'   
              type = 'button'
              disabled = {product.countInStock===0}
              onClick={addToCartHandler}
              >
                Add To Cart

              </Button>
            </ListGroupItem>

          </ListGroup>
        </Card>
        </Col>
      </Row>
      )}


      
    </>
  )
}

export default ProductScreen